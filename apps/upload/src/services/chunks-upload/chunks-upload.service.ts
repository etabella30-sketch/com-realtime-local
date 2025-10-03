import { Injectable, OnModuleInit } from '@nestjs/common';
import { UploadService } from '../../upload.service';
import { ChunkStatus, MergeChunksReq, UploadResponce } from '../../interfaces/chunk.interface';
import { RedisDbService } from '@app/global/db/redis-db/redis-db.service';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class ChunksUploadService  {

    private readonly tempUploadPath = this.upld.tempChunkPath;
    constructor(private readonly upld: UploadService, private readonly redisDbService: RedisDbService,
        @InjectQueue('file-merge') private fileMergeQueue: Queue) {

         this.fileMergeQueue.on('error', (error) => {
             // throw new Error('Error in file merge queue: ' + error);
         });
 
         this.fileMergeQueue.on('completed', (job, result) => {
             console.log(`ACTIVE JOB FOR COMPLETE ${job.id} completed. Result: ${JSON.stringify(result)}`);
         });
 
         this.fileMergeQueue.on('failed', (job, err) => {
             console.log(`ACTIVE JOB FOR FAILED  failed. Error: `, job, err);
         });
 
         this.fileMergeQueue.on('active', (job) => {
             console.log(`ACTIVE JOB FOR ACTIVE ${job.id} started processing.`);
         });
 
         // Monitor queue events
         this.fileMergeQueue.on('waiting', (jobId) => {
             console.log(`Job ${jobId} is waiting`);
         });
 
         this.fileMergeQueue.on('stalled', (job) => {
             console.log(`Job ${job.id} has stalled`);
         });
 
         this.fileMergeQueue.on('progress', (job, progress) => {
             console.log(`Job ${job.id} progress: ${progress}%`);
         });

        console.log('\n\r\n\r\n\r\n\rChunk upload service initialized.');

        // this.onInit();

    }

    async onModuleInit() {
        await this.clearQueue();
    }

    async onInit() {
        // let jobs = await this.fileMergeQueue.getJobs(['active', 'waiting', 'delayed', 'completed', 'failed']);
        // console.log('\n\r\n\r iunited', jobs)

    }

    async checkExistingChunks(identifier: string): Promise<ChunkStatus> {
        let MaxChunks = -1;
        try {
            MaxChunks = await this.redisDbService.getMaxFromList(this.upld.redisKey + identifier);
            MaxChunks = isNaN(MaxChunks) ? -1 : MaxChunks;
            MaxChunks = (MaxChunks - 10) > 0 ? (MaxChunks - 10) : 0
        } catch (error) {
        }
        return { max: MaxChunks, msg: 1 };
    }

    async saveChunk(file: Express.Multer.File, body: any): Promise<UploadResponce> {
        // console.log('Saving chunk...', body.identifier, body.chunkNumber);
        if (!file || !body.identifier || !body.chunkNumber) {
            return { m: -1, i: body.chunkNumber };
        }
        this.redisDbService.pushAndTrimList(this.upld.redisKey + body.identifier, parseInt(body.chunkNumber),48 * 3600); //, 
        return { m: 1, i: body.chunkNumber };
    }

    async completeUpload(body: MergeChunksReq) { //{ identifier: string, totalChunks: number }
        console.log('JOB SETTING UP FOR ', body);
        let queueRes: any = await this.fileMergeQueue.add(body, { removeOnComplete: true, removeOnFail: true, timeout: 1000 * 60 * 60 * 1, attempts: 3, backoff: 1000 * 60 * 5 }); //


        // this.mergeChunk.handleMerge({ data: body });

        console.log('Job added to the queue:');
        console.log('Job ID:', queueRes.id);
        // console.log('Job data:', queueRes.data);
        // console.log('Job options:', queueRes.opts);
        // console.log('Timestamp:', queueRes.timestamp);
        this.onInit();

        // console.log('MERGE COMPLETE AT END',queueRes.id)
        return { msg: 1, value: 'Merge started...' };

    }



    async clearQueue() {
        await this.fileMergeQueue.clean(0, 'completed');
        await this.fileMergeQueue.clean(0, 'wait');
        await this.fileMergeQueue.clean(0, 'active');
        await this.fileMergeQueue.clean(0, 'delayed');
        await this.fileMergeQueue.clean(0, 'failed');

        console.log('All jobs cleared.');
    }

}