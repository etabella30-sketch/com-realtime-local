import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { ContactController } from '../../controllers/contact/contact.controller';
import { ContactService } from '../../services/contact/contact.service';
import { JwtMiddleware } from '@app/global/middleware/jwt.middleware';

@Module({
    imports: [SharedModule],
    controllers: [ContactController],
    providers: [ContactService]
})
export class ContactModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(JwtMiddleware)
            .forRoutes(ContactController);

    }
}