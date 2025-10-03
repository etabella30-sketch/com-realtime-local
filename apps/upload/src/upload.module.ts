import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { ChunksUploadService } from './services/chunks-upload/chunks-upload.service';
import { UtilityService } from './services/utility/utility.service';
import { ChunkManagementController } from './controllers/chunk-management/chunk-management.controller';
import { WinstonConfigModule } from '@app/global/modules/winston.module';
import { KafkaSharedModule } from '@app/global/modules/kafka-shared.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { RedisDbService } from '@app/global/db/redis-db/redis-db.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QueryBuilderService } from '@app/global/db/pg/query-builder.service';
import { DbService } from '@app/global/db/pg/db.service';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { BullModule } from '@nestjs/bull';
import { MergeProcessor } from './processor/merge.processor';
import { JwtMiddleware } from '@app/global/middleware/jwt.middleware';
import { JwtStrategy } from '@app/global/utility/jwt/jwt.strategy';
import { GlobalModule } from '@app/global';
import { VerifypdfService } from './services/verifypdf/verifypdf.service';
// import { FileVerificationProcessor } from './processor/file-verification.processor';
import { UpdatefileinfoService } from './services/updatefileinfo/updatefileinfo.service';
import { FilesystemService } from '@app/global/utility/filesystem/filesystem.service';
import { ZipService } from './services/zip/zip.service';
import { UnzipProcessor } from './processor/unzip.processor';
import { RealtimeUploadController } from './controllers/realtime-upload/realtime-upload.controller';
import { ExportsController } from './controllers/exports/exports.controller';
import { ExportsService } from './services/exports/exports.service';
import { ExportExcelProcessor } from './processor/export-excel.processor';
import { filecopyService } from './services/filecopy/filecopy.service';
import { FileCopyProcessor } from './processor/copy-file.processor';
import { LogService } from '@app/global/utility/log/log.service';

@Module({
  imports: [
    GlobalModule,
    KafkaSharedModule,
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'single',
        url: config.get('REDIS_URL'),
      }),
    }),
    MulterModule.register({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          const identifier = req.body.identifier;
          const destPath = path.join('./assets/upload-chunks', identifier);
          /*fs.mkdirSync(destPath, { recursive: true });
          cb(null, destPath);*/
          fs.promises.mkdir(destPath, { recursive: true })
            .then(() => cb(null, destPath))
            .catch(err => cb(err, destPath));
        },
        filename: (req, file, cb) => {
          const chunkNumber = req.body.chunkNumber;
          cb(null, `${chunkNumber}`);
        }
      })
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        redis: {
          port: Number(config.get('REDIS_PORT')),
          host: config.get('REDIS_IP'),
          password: config.get('REDIS_PASSWORD'),
        }, //as RedisOptions
      }),
    }),

    BullModule.registerQueue({
      name: 'file-merge',
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
      limiter: {
        max: 1000, // Maximum number of jobs to keep in Redis
        duration: 60000, // Time window in milliseconds (e.g., 1 minute)
      },
    }),
    BullModule.registerQueue({
      name: 'unzip-process',
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
      limiter: {
        max: 1000, // Maximum number of jobs to keep in Redis
        duration: 60000, // Time window in milliseconds (e.g., 1 minute)
      },
    }),
    BullModule.registerQueue({
      name: 'export-excel',
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
      limiter: {
        max: 1000, // Maximum number of jobs to keep in Redis
        duration: 60000, // Time window in milliseconds (e.g., 1 minute)
      },
    }),
    BullModule.registerQueue({
      name: 'filecopy-process',
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
      limiter: {
        max: 1000, // Maximum number of jobs to keep in Redis
        duration: 60000, // Time window in milliseconds (e.g., 1 minute)
      },
    }),
    WinstonConfigModule.forRoot('upload')
  ],
  controllers: [UploadController, ChunkManagementController, RealtimeUploadController, ExportsController],
  providers: [UploadService, DbService, QueryBuilderService, ConfigService, RedisDbService,
    ChunksUploadService,UtilityService, MergeProcessor, UnzipProcessor, JwtStrategy, VerifypdfService, UpdatefileinfoService, FilesystemService, ExportsService,ExportExcelProcessor,FileCopyProcessor, filecopyService,LogService
  ],
})
export class UploadModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(
        { path: 'upload/complete-upload', method: RequestMethod.POST },
        { path: 'upload/status', method: RequestMethod.GET },
        { path: 'exports/upload-report', method: RequestMethod.POST },
        { path: 'exports/delete-files', method: RequestMethod.DELETE }
      );
  }
}

