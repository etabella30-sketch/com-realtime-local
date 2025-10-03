import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { TeamSetupController } from '../../controllers/team/team-setup.controller';
import { TeamSetupService } from '../../services/team/team-setup/team-setup.service';
import { JwtMiddleware } from '@app/global/middleware/jwt.middleware';
import { TeamDataController } from '../../controllers/team/team-data.controller';
import { TeamDataService } from '../../services/team/team-data/team-data.service';
import { PasswordHashService } from '@app/global/utility/cryptography/password-hash.service';

@Module({
    imports: [SharedModule],
    controllers: [TeamDataController,TeamSetupController],
    providers: [TeamSetupService,TeamDataService,PasswordHashService],
})
export class TeamSetupModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(JwtMiddleware)
            .forRoutes(TeamSetupController,TeamDataController);
    }
}
