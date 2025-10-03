import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { filecopyService } from '../services/filecopy/filecopy.service';


@Processor('filecopy-process')
export class FileCopyProcessor {

  constructor(private readonly fileService: filecopyService) {}

  @Process({ concurrency: 10 })
  async handleCopyFile(job: Job) {


    const { cPath } = job.data;
    await this.fileService.copyFile(cPath);

  }



}
