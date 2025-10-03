import { Module } from '@nestjs/common';
import { CoreapiController } from './coreapi.controller';
import { CoreapiService } from './coreapi.service';
import { CaseModule } from './modules/case/case.module';
import { GlobalModule } from '@app/global';
import { TeamSetupModule } from './modules/team/team-setup.module';
import { BundleCreationModule } from './modules/bundle/bundle-creation.module';
import { PermissionModule } from './modules/permission/permission.module';
import { AdminDashboardModule } from './modules/admin-dashboard/admin-dashboard.module';
import { UserDashboardModule } from './modules/user-dashboard/user-dashboard.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { KafkaSharedModule } from '@app/global/modules/kafka-shared.module';
import { UploadModule } from './modules/upload/upload.module';
import { IndividualModule } from './modules/individual/individual.module';
import { CommonModule } from './modules/common/common.module';
import { ContactModule } from './modules/contact/contact.module';
@Module({
  imports: [
    KafkaSharedModule,
    UserDashboardModule, AdminDashboardModule, GlobalModule, CaseModule, TeamSetupModule, BundleCreationModule, PermissionModule, TicketModule, UploadModule,
    IndividualModule, CommonModule, ContactModule],
  controllers: [CoreapiController],
  providers: [CoreapiService],
})
export class CoreapiModule { }
