import { KafkaSharedModule } from '@app/global/modules/kafka-shared.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SharedModule } from 'apps/authapi/src/shared/shared.module';
import { JwtMiddleware } from '@app/global/middleware/jwt.middleware';
import { PaginationdataController } from '../../controllers/paginationdata/paginationdata.controller';
import { PaginationdataService } from '../../services/paginationdata/paginationdata.service';
import { UtilityService } from '../../utility/utility.service';

@Module({
    imports: [SharedModule, KafkaSharedModule],
    controllers: [PaginationdataController],
    providers: [PaginationdataService, UtilityService]
})
export class PaginationdataModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(JwtMiddleware)
            .forRoutes(PaginationdataController);
    }

}
