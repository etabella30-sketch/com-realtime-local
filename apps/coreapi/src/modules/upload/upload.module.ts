import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { UploadController } from '../../controllers/upload/upload.controller';
import { JwtMiddleware } from '@app/global/middleware/jwt.middleware';
import { UploadService } from '../../services/upload/upload.service';
@Module({
    imports: [SharedModule],
    controllers: [UploadController],
    providers: [UploadService],
})
export class UploadModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(JwtMiddleware)
            .forRoutes(UploadController);
    }
}
