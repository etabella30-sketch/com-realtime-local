import { Module } from '@nestjs/common';
import { SocketAppController } from './socket-app.controller';
import { SocketAppService } from './socket-app.service';
import { EventsGateway } from './events/events.gateway';
import { RedisModule } from '@nestjs-modules/ioredis';
import { DbService } from '@app/global/db/pg/db.service';
import { QueryBuilderService } from '@app/global/db/pg/query-builder.service';
import { RedisDbService } from '@app/global/db/redis-db/redis-db.service';
import { ConfigService } from '@nestjs/config';
import { WsJwtGuard } from './guards/ws.guard';
import { LogService } from '@app/global/utility/log/log.service';
import { WinstonConfigModule } from '@app/global/modules/winston.module';
import { KafkaSharedModule } from '@app/global/modules/kafka-shared.module';
import { GlobalModule } from '@app/global';
import { UploadService } from './services/upload/upload.service';
import { WebSocketModule } from '@app/global/modules/websocket.module';
import { UsersService } from './services/users/users.service';
import { SocketController } from './controllers/socket.controller';
import { IndexService } from './services/index/index.service';
import { PaginationService } from './services/pagination/pagination.service';
import { BatchfileService } from './services/batchfile/batchfile.service';

@Module({
  imports: [KafkaSharedModule, WebSocketModule, GlobalModule,
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'single',
        url: config.get('REDIS_URL'),
      }),
    }),
    WinstonConfigModule.forRoot('upload')
  ],
  controllers: [SocketAppController, SocketController
  ],
  providers: [SocketAppService, WsJwtGuard, EventsGateway, DbService, QueryBuilderService, ConfigService, RedisDbService, LogService, UploadService, UsersService, IndexService, PaginationService, BatchfileService],
})
export class SocketAppModule { }
