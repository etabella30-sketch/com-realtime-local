import { Module } from '@nestjs/common';
import { PaginationController } from './pagination.controller';
import { PaginationService } from './pagination.service';
import { GlobalModule } from '@app/global';
import { PaginationdataController } from './controllers/paginationdata/paginationdata.controller';
import { PaginationdataService } from './services/paginationdata/paginationdata.service';
import { PaginationdataModule } from './modules/paginationdata/paginationdata.module';
import { DbService } from '@app/global/db/pg/db.service';
import { KafkaSharedModule } from '@app/global/modules/kafka-shared.module';
import { QueryBuilderService } from '@app/global/db/pg/query-builder.service';
import { UtilityService } from './utility/utility.service';

@Module({
  imports: [GlobalModule, PaginationdataModule, KafkaSharedModule],
  controllers: [PaginationController, PaginationdataController],
  providers: [PaginationService, PaginationdataService, DbService, QueryBuilderService, UtilityService],
})
export class PaginationModule { }
