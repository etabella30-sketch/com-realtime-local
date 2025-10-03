import { createReadStream, createWriteStream, promises as fsPromises } from 'fs';
import { join, resolve } from 'path';
import { Processor, Process, InjectQueue } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { UploadService } from '../upload.service';
import { VerifypdfService } from '../services/verifypdf/verifypdf.service';
import { UpdatefileinfoService } from '../services/updatefileinfo/updatefileinfo.service';
import { FilesystemService } from '@app/global/utility/filesystem/filesystem.service';
import { ConfigService } from '@nestjs/config';
import { FileValidateResponse } from '../interfaces/chunk.interface';
import { saveFileInfoReq, startJob } from '../interfaces/upload.interface';
import { RedisDbService } from '@app/global/db/redis-db/redis-db.service';
import { UtilityService } from '../services/utility/utility.service';
import { LogService } from '@app/global/utility/log/log.service';

@Processor('file-merge')
export class MergeProcessor {
  private readonly logApp: string = 'upload';
  constructor(
    private readonly upld: UploadService,
    private readonly fileVerificationService: VerifypdfService,
    private filesystemService: FilesystemService,
    private config: ConfigService,
    private readonly fileInfo: UpdatefileinfoService, private readonly rds: RedisDbService,
    private readonly logService: LogService,
    // @InjectQueue('file-merge') private fileMergeQueue: Queue,
    @InjectQueue('unzip-process') private UnzipQueue: Queue,
    private readonly utility: UtilityService,
    @InjectQueue('filecopy-process') private fileCopyQueue: Queue
    // private readonly fileMergeQueue: Queue<any>,
  ) {

    this.setupQueueListeners();
  }

  private setupQueueListeners() {

    // this.fileMergeQueue.on('completed', (job, result) => {
    //   console.log(`ACTIVE JOB FOR COMPLETE ${job.id} completed. Result: ${JSON.stringify(result)}`);
    // });

    // this.fileMergeQueue.on('failed', (job, err) => {
    //   console.log(`ACTIVE JOB FOR FAILED ${job.id} failed. Error: ${err.message}`);
    // });

    // this.fileMergeQueue.on('active', (job) => {
    //   console.log(`ACTIVE JOB FOR ACTIVE ${job.id} started processing.`);
    // });


    // this.fileMergeQueue.on('drained', () => {
    //   console.log('\n\r\n\rQueue has been drained. All jobs completed.');
    //   // Perform any necessary actions or cleanup here
    // });
  }

  @Process({ concurrency: 10 }) //
  async handleMerge(job: Job) {

    this.logService.info(`log start ${job.data.identifier}`, this.logApp)
    console.log('JOB MERGE FOR DOC : ', job.data.identifier);
    let mergeSuccess = true;
    const { identifier, totalChunks, nCaseid, filetype, name, nUDid } = job.data;
    const chunksPath = join(this.upld.tempChunkPath, identifier);
    const dirPath = `${this.upld.docPath}/case${nCaseid}`;
    const dirFile = `${dirPath}/${name}.${filetype}`;
    const outputPath = resolve(this.config.get('ASSETS'), dirFile);
    await this.filesystemService.createDirectoryHierarchy(dirPath);

    const writeStream = createWriteStream(outputPath);
    // Sequentially add chunks to the write stream
    for (let i = 0; i < totalChunks; i++) {
      // console.log('Merging chunks...', i);
      const chunkPath = join(chunksPath, `${i}`);
      try {
        await new Promise<void>((resolve, reject) => {
          const readStream = createReadStream(chunkPath);
          readStream.on('error', (error) => {

            try {
              this.logService.error(`error reading chunk : nUDid=${nUDid} ${identifier} : ${JSON.stringify(error)}`, this.logApp)
            } catch (error) {
              this.logService.error(`error reading chunk : nUDid=${nUDid}  ${identifier} `, this.logApp)
            }
            console.error('Error reading chunk:', error);
            writeStream.destroy();
            reject(error);
          });
          readStream.pipe(writeStream, { end: false });
          readStream.on('end', () => {
            resolve();
          });
        });
      } catch (error) {
        mergeSuccess = false;

        try {
          this.logService.error(`MERGING-FAILED : nUDid=${nUDid} ${identifier} : ${JSON.stringify(error)}`, this.logApp)
        } catch (error) {
        }
        this.utility.emit({ event: 'MERGING-FAILED', data: { identifier, nMasterid: job.data.nMasterid } });
      }
    }

    writeStream.on('error', (error) => {

      try {
        this.logService.error(`MERGING-FAILED  Error writing file : nUDid=${nUDid} ${identifier} : ${JSON.stringify(error)}`, this.logApp)
      } catch (error) {
      }
      mergeSuccess = false;
      console.error('Error writing file:', error);
      this.utility.emit({ event: 'MERGING-FAILED', data: { identifier, nMasterid: job.data.nMasterid } });
    });

    if (!mergeSuccess) {
      writeStream.destroy();
      await this.deleteChunks(chunksPath, identifier);
      return;
    }

    writeStream.on('finish', async () => {

      try {
        this.logService.info(`file merged ${identifier} : nUDid=${nUDid}`, this.logApp)
      } catch (error) {
      }
      this.utility.emit({ event: 'FILE-MERGED', data: { identifier, nMasterid: job.data.nMasterid } });
      if (filetype.toUpperCase() === 'ZIP') {


        // console.log('File is a ZIP, skipping verification.');

        const jobObj: startJob = {
          nUDid: nUDid,
          nMasterid: job.data.nMasterid,
          cPath: dirFile,
          nCaseid: job.data.nCaseid,
          nSectionid: job.data.nSectionid,
          nBundleid: job.data.nBundleid,
          identifier: identifier
        }

        let res = await this.fileInfo.jobStart(jobObj)
        if (res.msg == 1) {

          try {
            this.logService.info(`zip process ${identifier} : nUDid=${nUDid} nJobid=${res.nJobid}`, this.logApp)
          } catch (error) {
          }
          this.utility.emit({ event: 'ZIP-PROCESS', data: { identifier, nMasterid: job.data.nMasterid, nJobid: res.nJobid } });
          await this.UnzipQueue.add({ nJobid: res.nJobid }, { removeOnComplete: true, removeOnFail: true, timeout: 1000 * 60 * 60 * 24, attempts: 3, backoff: 1000 * 60 * 5 });
        } else {

          try {
            this.logService.error(`zip failed ${identifier} : nUDid=${nUDid}`, this.logApp)
          } catch (error) {
          }

          this.utility.emit({ event: 'ZIP-FAILED', data: { identifier, nMasterid: job.data.nMasterid } });
        }

        await this.deleteChunks(chunksPath, identifier);

        return;
      }

      // console.log('All chunks merged, now verifying...');
      const verificationResult: FileValidateResponse = await this.fileVerificationService.verifyFile(outputPath);
      // console.log('Verification complete:', verificationResult);
      this.utility.emit({ event: 'VERIFY-CPOMPLETE', data: { identifier, nMasterid: job.data.nMasterid } });

      try {
        this.logService.info(`VERIFY-CPOMPLETE ${identifier} : nUDid=${nUDid}`, this.logApp)
      } catch (error) {
      }


      const fileInfo: saveFileInfoReq = {
        nUDid: nUDid,
        nMasterid: job.data.nMasterid,
        cFilename: job.data.cFilename,
        nSectionid: job.data.nSectionid,
        nBundleid: job.data.nBundleid,
        nBundledetailid: job.data.nBundledetailid,
        cFiletype: filetype,
        isValidate: verificationResult.isValidate ? verificationResult.isValidate : false,
        cPath: dirFile,
        cFilesize: job.data.filesize.toString(),
        nPagerotation: verificationResult.pagerotation,
        cPage: `1-${verificationResult.totalpages}`,
        bisTranscript: (job.data.bisTranscript ? job.data.bisTranscript : false),
      };

      console.log('\n\r\n\r Update file info', fileInfo)

      let res = await this.fileInfo.updateFileInfo(fileInfo)
      let isComplete = false;
      if (res.msg == 1) {
        isComplete = true;
        // success responce
        try {
          this.logService.info(`FILE-INSERT-COMPLETE ${identifier} : nUDid=${nUDid}`, this.logApp)
        } catch (error) {
        }
  
        this.utility.emit({ event: 'FILE-INSERT-COMPLETE', data: { ...res, identifier, nMasterid: job.data.nMasterid, msg: 1 } });
        if (job.data.bisTranscript) {
          this.utility.emit({ event: 'FILE-INSERT-COMPLETE', data: { ...res, identifier, nMasterid: job.data.nMasterid, msg: 1 } }, 'REALTIME-FILE-UPLOAD');
        }
      } else {
        isComplete = false;
        
        try {
          this.logService.error(`FILE-INSERT-Failed ${identifier} : nUDid=${nUDid}`, this.logApp)
        } catch (error) {
        }
  
        this.utility.emit({ event: 'FILE-INSERT-FAILED', data: { identifier, nMasterid: job.data.nMasterid, msg: -1 } });
        if (job.data.bisTranscript) {
          this.utility.emit({ event: 'FILE-INSERT-COMPLETE', data: { ...res, identifier, nMasterid: job.data.nMasterid, msg: 1 } }, 'REALTIME-FILE-UPLOAD');
        }
      }

      if (isComplete) {

        await this.fileCopyQueue.add({ cPath: dirFile }, { removeOnComplete: true, removeOnFail: true, timeout: 1000 * 60 * 60 * 1, attempts: 3, backoff: 1000 * 60 * 5 }); //


      }


      // console.log('Process completed.');
    });

    writeStream.end();
    await this.deleteChunks(chunksPath, identifier);
  }


  /*private async clearBullData(job: Job) {
    const keys = [
      // Add the Redis keys used by Bull here
      `bull:${this.fileMergeQueue.name}:completed`,
      `bull:${this.fileMergeQueue.name}:delayed`,
      `bull:${this.fileMergeQueue.name}:wait`,
      `bull:${this.fileMergeQueue.name}:active`,
      `bull:${this.fileMergeQueue.name}:failed`,
      // ...
    ];

    for (const key of keys) {
      await this.rds.deleteList(key);
    }
  }*/

  async deleteChunks(chunksPath: string, identifier: String): Promise<any> {
    try {
      // console.log('\n\r\n\rRemove redis shorted lits', this.upld.redisKey + identifier);
      this.rds.deleteList(this.upld.redisKey + identifier);
      await fsPromises.rm(chunksPath, { recursive: true });
      // console.log('File Deleted')
    } catch (error) {
      console.error('Failed to delete chunk directory:', error);
    }
  }

}
