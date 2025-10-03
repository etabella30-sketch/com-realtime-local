import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtMiddleware } from '@app/global/middleware/jwt.middleware';
import { GenerateindexController } from '../controllers/generateindex/generateindex.controller';
import { GenerateindexService } from '../services/generateindex/generateindex.service';
import { SharedModule } from 'apps/authapi/src/shared/shared.module';
import { UtilityService } from '../services/utility/utility.service';
import { KafkaSharedModule } from '@app/global/modules/kafka-shared.module';

@Module({
    imports: [SharedModule, KafkaSharedModule],
    controllers: [GenerateindexController],
    providers: [GenerateindexService, UtilityService]
})
export class GenerateindexModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(JwtMiddleware)
            .forRoutes(GenerateindexController);
    }

}
