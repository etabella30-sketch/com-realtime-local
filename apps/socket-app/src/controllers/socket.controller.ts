import { Controller } from '@nestjs/common';
import { UploadService } from '../services/upload/upload.service';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { IndexService } from '../services/index/index.service';
import { UsersService } from '../services/users/users.service';
import { PaginationService } from '../services/pagination/pagination.service';
import { BatchfileService } from '../services/batchfile/batchfile.service';

@Controller()
export class SocketController {

  constructor(private readonly upload: UploadService, private readonly index: IndexService, private user: UsersService, private readonly pagination: PaginationService, private readonly batchfile: BatchfileService) { }




  @MessagePattern('upload-response')
  handeAuth2(@Payload() message: any, @Ctx() context: KafkaContext) {
    console.log(`Received message for upload-response: `, message);
    // handle notification
    this.upload.emitMsg(message);
  }

  @MessagePattern('EXPORT-EXCEL-RESPONCE')
  handleExportExcel(@Payload() message: any, @Ctx() context: KafkaContext) {
    console.log(`Received message for EXPORT-EXCEL-RESPONCE: `, message);
    // handle notification
    this.upload.emitMsg(message, 'EXPORT-EXCEL-RESPONCE');
  }


  @MessagePattern('index-response')
  handeAuth3(@Payload() message: any, @Ctx() context: KafkaContext) {
    console.log(`Received message for index-response: `, message);
    // handle notification
    this.index.emitMsg(message);
  }




  @MessagePattern('LOGIN-VERIFY')
  onUserVerify(@Payload() message: any, @Ctx() context: KafkaContext) {
    console.log(`Received message for index-response: `, message);
    // handle notification
    this.user.emitMsg(message);
  }
  @MessagePattern('pagination-response')
  handeAuth4(@Payload() message: any, @Ctx() context: KafkaContext) {
    console.log(`Received message for pagination-response: `, message);
    // handle notification
    this.pagination.emitMsg(message);
  }


  @MessagePattern('batchfile-response')
  handeAuth5(@Payload() message: any, @Ctx() context: KafkaContext) {
    console.log(`Received message for batchfile-response: `, message);
    // handle notification
    this.batchfile.emitMsg(message);
  }
}
