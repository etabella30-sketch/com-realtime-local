import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { UpdatefileinfoService } from '../services/updatefileinfo/updatefileinfo.service';
import { jobDetail } from '../interfaces/unzip.interface';
// import { ZipService } from '../services/zip/zip.service';
import { UtilityService } from '../services/utility/utility.service';
import { Inject, OnApplicationShutdown } from '@nestjs/common';
import { ModuleRef, REQUEST } from '@nestjs/core';
import { ZipService } from '../services/zip/zip.service';
import { LogService } from '@app/global/utility/log/log.service';


@Processor('unzip-process')
export class UnzipProcessor implements OnApplicationShutdown {
  start: Date = new Date();
  end: Date;
  private readonly logApp: string = 'upload';
  constructor(private readonly fileInfo: UpdatefileinfoService,
    //  private readonly zip: ZipService, 
    // @Inject(REQUEST) private readonly zipServiceFactory: () => ZipService,
    private readonly utility: UtilityService, private readonly moduleRef: ModuleRef
    , private readonly logService: LogService
  ) {
  }

  onApplicationShutdown(signal?: string) {
    console.log(`Shutting down unzip processor on signal: ${signal}`);
    // Close any open resources or perform other cleanup tasks
    try {
      // if (zipService.zipFile) {
      //   zipService.zipFile.close();
      // }
    } catch (error) {
      console.log('Error closing zip file', error);
    }
    // zipService.clearLogAction();
  }

  @Process({ concurrency: 20 })
  async handleUnzip(job: Job) {


    const zipService = await this.moduleRef.create(ZipService);
    // const zipService = this.zipServiceFactory();
    const { nJobid } = job.data;

    this.logService.info(`Unzipping job... ${nJobid}`, this.logApp)
    console.log('Unzipping job...', nJobid);
    const jobDetail: jobDetail = await this.fileInfo.getJobDetail(nJobid); // Unzip the file

    try {

      this.utility.emit({ event: 'ZIP-DETAIL', data: { identifier: jobDetail.identifier, nJobid, nMasterid: jobDetail.nUserid } });
      try {
        this.logService.info(`ZIP-DETAIL identifier: ${jobDetail.identifier}, ${nJobid}, nMasterid: ${jobDetail.nUserid}`, this.logApp)
      } catch (error) {

      }
      console.log('Open zip file', new Date());
      const ResFromOpenZip = await zipService.openZipFile(jobDetail.cPath); // open the zip file
      if (!ResFromOpenZip) {
        try {
          this.logService.error(`ZIP-OPEN-FAILED : identifier: ${jobDetail.identifier}, ${nJobid}, nMasterid: ${jobDetail.nUserid}`, this.logApp)
        } catch (error) {
        }
        this.utility.emit({ event: 'ZIP-OPEN-FAILED', data: { identifier: jobDetail.identifier, nJobid, nMasterid: jobDetail.nUserid } });

        zipService.failedTask(nJobid);
        console.log('Error opening zip file'); // log error
        return;
      }

      console.log('Read zip file', new Date());
      try {
        zipService.files = await zipService.readFiles(); // read file entries  
      } catch (error) {

        try {
          this.logService.error(`ZIP-READ-failed : identifier: ${jobDetail.identifier}, ${nJobid}, nMasterid: ${jobDetail.nUserid}`, this.logApp)
        } catch (error) {
        }
      }


      try {
        this.logService.info(`ZIP-READ-SUCCESS : identifier: ${jobDetail.identifier}, ${nJobid}, nMasterid: ${jobDetail.nUserid}`, this.logApp)
      } catch (error) {
      }
      this.utility.emit({ event: 'ZIP-READ-SUCCESS', data: { identifier: jobDetail.identifier, nJobid, nMasterid: jobDetail.nUserid } });

      console.log('Read zip file', zipService.files.length);

      await zipService.formateData(zipService.files); // format the data

      try {
        this.logService.info(`ZIP-FORMATE-SUCCESS : identifier: ${jobDetail.identifier}, ${nJobid}, nMasterid: ${jobDetail.nUserid}`, this.logApp)
      } catch (error) {
      }
      this.utility.emit({ event: 'ZIP-FORMATE-SUCCESS', data: { identifier: jobDetail.identifier, nJobid, nMasterid: jobDetail.nUserid } });
      console.log('Zip result length', zipService.result.length);

      if (!zipService.result.length) {
        zipService.failedTask(nJobid);

        try {
          this.logService.error(`ZIP-NO-FORMATES : identifier: ${jobDetail.identifier}, ${nJobid}, nMasterid: ${jobDetail.nUserid}`, this.logApp)
        } catch (error) {
        }
        this.utility.emit({ event: 'ZIP-NO-FORMATES', data: { identifier: jobDetail.identifier, nJobid, nMasterid: jobDetail.nUserid } });
        console.log('No files found in zip result'); // no files in zip; process complete;
        return;
      }

      const responce = await this.fileInfo.saveBundle(jobDetail, zipService.result);

      if (!responce.length) {
        zipService.failedTask(nJobid);

        try {
          this.logService.error(`ZIP-BUNDLE-SAVE-FAILED : identifier: ${jobDetail.identifier}, ${nJobid}, nMasterid: ${jobDetail.nUserid}`, this.logApp)
        } catch (error) {
        }
        this.utility.emit({ event: 'ZIP-BUNDLE-SAVE-FAILED', data: { identifier: jobDetail.identifier, nJobid, nMasterid: jobDetail.nUserid } });
        console.log('No files found in responce'); // no files in zip; process complete;
        return;
      }

      try {
        this.logService.info(`ZIP-BUNDLE-SAVE : identifier: ${jobDetail.identifier}, ${nJobid}, nMasterid: ${jobDetail.nUserid}`, this.logApp)
      } catch (error) {
      }
      this.utility.emit({ event: 'ZIP-BUNDLE-SAVE', data: { identifier: jobDetail.identifier, nJobid, nMasterid: jobDetail.nUserid } });

      zipService.totalTasks = responce.length;
      zipService.sendReport(jobDetail)


      try {
        this.logService.info(`Files found in zip : identifier: ${jobDetail.identifier}, ${nJobid}, nMasterid: ${jobDetail.nUserid} length : ${responce.length}`, this.logApp)
      } catch (error) {
      }
      console.log('Files found in zip:', responce.length); // log number of files found
      // Process each file
      let resOfExtraction = await zipService.extrationIndividual(jobDetail, responce); // move files to destination
      if (!resOfExtraction) {

        try {
          this.logService.error(`failed at extraction : identifier: ${jobDetail.identifier}, ${nJobid}, nMasterid: ${jobDetail.nUserid} `, this.logApp)
        } catch (error) {
        }
        zipService.failedTask(nJobid);
        console.log('failed at extraction'); // no files in zip; process complete;
        return;
      }


      try {
        zipService.zipFile.close();
      } catch (error) {

      }
      await zipService.saveFinal(nJobid);

      console.log('All files extracted successfully!', this.start, this.end = new Date(), zipService.movedFiles.length); // log success
      try {
        this.logService.info(`All files extracted successfully : identifier: ${jobDetail.identifier}, ${nJobid}, nMasterid: ${jobDetail.nUserid}`, this.logApp)
      } catch (error) {
      }
      this.utility.emit({ event: 'ZIP-COMPLETE', data: { identifier: jobDetail.identifier, nJobid, nMasterid: jobDetail.nUserid } });
    } catch (error) {
      try {
        this.logService.error(`ZIP-FAILED : identifier: ${jobDetail.identifier}, ${nJobid}, nMasterid: ${jobDetail.nUserid} `, this.logApp)
      } catch (error) {
      }
      this.utility.emit({ event: 'ZIP-FAILED', data: { identifier: jobDetail.identifier, nJobid, nMasterid: jobDetail.nUserid } });
      console.log('error at final ', error); // log error
      zipService.failedTask(nJobid);
    }



  }




}
