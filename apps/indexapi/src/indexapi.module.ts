import { GlobalModule } from '@app/global';
import { Module } from '@nestjs/common';
import { IndexapiController } from './indexapi.controller';
import { IndexapiService } from './indexapi.service';
import { GenerateindexController } from './controllers/generateindex/generateindex.controller';
import { GenerateindexService } from './services/generateindex/generateindex.service';
import { DbService } from '@app/global/db/pg/db.service';
import { QueryBuilderService } from '@app/global/db/pg/query-builder.service';
import { KafkaSharedModule } from '@app/global/modules/kafka-shared.module';
import { UtilityService } from './services/utility/utility.service';
import { GenerateindexModule } from './modules/generateindex.module';
import { KafkaGlobalService } from '@app/global/utility/kafka/kafka.shared.service';

@Module({
    imports: [GlobalModule, IndexModule, KafkaSharedModule, GenerateindexModule
    ],
    controllers: [IndexapiController, GenerateindexController],
    providers: [IndexapiService, GenerateindexService, DbService, QueryBuilderService, UtilityService,],
})
export class IndexModule { }
