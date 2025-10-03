import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BundleCreationController } from '../../controllers/bundle/bundle-creation.controller';
import { BundleCreationService } from '../../services/bundle/bundle-creation.service';
import { SharedModule } from '../../shared/shared.module';
import { JwtMiddleware } from '@app/global/middleware/jwt.middleware';
import { BundlesController } from '../../controllers/bundle/bundles.controller';
import { AssignController } from '../../controllers/assign/assign.controller';
import { AssignService } from '../../services/assign/assign.service';

@Module({
    imports: [SharedModule],
    controllers: [BundlesController, BundleCreationController, AssignController],
    providers: [BundleCreationService, AssignService]
})
export class BundleCreationModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(JwtMiddleware)
            .forRoutes(BundlesController, BundleCreationController, AssignController);
    }
}