import { Module } from '@nestjs/common';
import { RealtimeServerController } from './realtime-server.controller';
import { RealtimeServerService } from './realtime-server.service';
import { ConfigService } from '@nestjs/config';
import { QueryBuilderService } from '@app/global/db/pg/query-builder.service';
import { DbService } from '@app/global/db/pg/db.service';
import { SessionController } from './controllers/session/session.controller';
import { SessionService } from './services/session/session.service';
import { DateTimeService } from '@app/global/utility/date-time/date-time.service';
import { SchedulerService } from '@app/global/utility/scheduler/scheduler.service';
import { SocketService } from './socket/socket.service';
import { EventsGateway } from './events/events.gateway';
import { WebSocketModule } from '@app/global/modules/websocket.module';
import { SavedataService } from '@app/global/utility/savedata/savedata.service';
import { StreamDataService } from '@app/global/utility/stream-data/stream-data.service';
import { FirebaseService } from './services/firebase/firebase.service';
import { IssueController } from './controllers/issue/issue.controller';
import { IssueService } from './services/issue/issue.service';
import { UsersService } from './services/users/users.service';
import { AnnotTransferService } from './services/annot-transfer/annot-transfer.service';
import { ExportService } from './services/export/export.service';
import { UtilityService } from './services/utility/utility.service';
import { ConversionJsService } from './services/conversion.js/conversion.js.service';
import { FileproviderService } from './services/fileprovider/fileprovider.service';
import { SyncController } from './controllers/sync/sync.controller';
import { SyncService } from './services/sync/sync.service';
import { KafkaModule } from '@app/global/modules/kafka.module';
import { KafkaSharedModule } from '@app/global/modules/kafka-shared.module';
import { UploadController } from './controllers/upload/upload.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FeedDataService } from './services/feed-data/feed-data.service';
import { RedisModule } from '@nestjs-modules/ioredis';
import { RedisDbService } from '@app/global/db/redis-db/redis-db.service';
import { GlobalModule } from '@app/global';
import { LogService } from '@app/global/utility/log/log.service';
import { WinstonConfigModule } from '@app/global/modules/winston.module';


@Module({
  imports: [
    GlobalModule,
    KafkaSharedModule,
    // KafkaModule.register('etabella-realtimeserver', 'realtimeserver-group'),
    WebSocketModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'single',
        url: config.get('REDIS_URL'),
      }),
    }),
    
    WinstonConfigModule.forRoot('upload')
  ],
  controllers: [RealtimeServerController, SessionController, IssueController, SyncController, UploadController],
  providers: [RealtimeServerService, DbService, QueryBuilderService, ConfigService, EventsGateway,
    SessionService, DateTimeService, SchedulerService, SocketService, StreamDataService, SavedataService, FirebaseService, 
    IssueService, UsersService, AnnotTransferService, ExportService, UtilityService, ConversionJsService, FileproviderService, SyncService, FeedDataService,
    RedisDbService,LogService],
  exports: [] // Exporting the provider
})
export class RealtimeServerModule { }
