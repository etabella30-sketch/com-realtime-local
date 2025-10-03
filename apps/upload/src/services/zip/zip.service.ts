import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as yauzl from 'yauzl';
import { v4 as uuidv4 } from 'uuid';
import * as async from 'async';
import * as fs from 'fs';
import { Stream } from 'stream';
import * as path from 'path';
import { VerifypdfService } from '../verifypdf/verifypdf.service';
import { FileValidateResponse } from '../../interfaces/chunk.interface';
import { UpdatefileinfoService } from '../updatefileinfo/updatefileinfo.service';
import { UtilityService } from '../utility/utility.service';
import { jobDetail } from '../../interfaces/unzip.interface';
import { delay } from 'rxjs';
import { LogService } from '@app/global/utility/log/log.service';

@Injectable()
export class ZipService {
    public zipFile: any;
    private queue: async.QueueObject<any>;
    public result: any = [];
    public files: any[] = [];
    public movedFiles = [];

    public totalTasks: number = 0;
    private completedTasks: number = 0;
    private failedTasks: number = 0;
    private pendingTasks: number = 0;
    intervalOfqueue: any;
    private readonly logApp: string = 'upload';
    constructor(private config: ConfigService, private readonly fileVerificationService: VerifypdfService, private readonly fileInfo: UpdatefileinfoService, private readonly utility: UtilityService, private readonly logService: LogService) {
        this.queue = async.queue(this.processTask.bind(this), 10)
    }

    openZipFile(zipPath: string): Promise<any> {
        return new Promise((resolve, reject) => {
            yauzl.open(`${this.config.get('ASSETS')}${zipPath}`, { lazyEntries: true, autoClose: false }, (err, zipfl) => {
                if (err) {
                    resolve(false);
                }
                this.zipFile = zipfl;
                resolve(true);
            });
        });
    }

    async readFiles(): Promise<any> {
        let folders = [];
        let files = [];
        return new Promise((resolve, reject) => {
            this.zipFile.readEntry();
            this.zipFile.on('entry', (entry) => {
                if (/\/$/.test(entry.fileName)) {
                    // folders.push(entry.fileName);
                } else {
                    files.push({ path: entry.fileName, entry: entry });
                }
                this.zipFile.readEntry();
            });
            this.zipFile.on('end', () => {
                resolve(files);
            });
        });
    }

    async formateData(res: any[]): Promise<any[]> {
        let idCounter = 1;
        let result: any[] = [];
        const itemsMap = new Map();

        try {
            res.forEach((e) => {
                let path = e.path;
                const components = path.split('/');
                let parentId = 0;
                components.forEach((component, index) => {
                    const isLastComponent = index === components.length - 1;
                    const isFolder = !isLastComponent;
                    let itemKey = `${parentId}-${component}`;

                    if (!itemsMap.has(itemKey)) {
                        itemsMap.set(itemKey, idCounter);
                        let prtId = '0';
                        if (parentId) {
                            let ojs = result.find((m) => m.ids == parentId);
                            if (ojs) {
                                prtId = ojs.id;
                            }
                        }
                        result.push({
                            id: uuidv4(),
                            ids: idCounter,
                            isFolder: isFolder,
                            name: component,
                            parentId: prtId,
                            path: path,
                        });
                        idCounter++;
                    }
                    parentId = itemsMap.get(itemKey);
                });
            });
        } catch (error) {
            console.log('Error at reading formate file');
            // Handle error if needed
        }

        this.result = result;
        return result;
    }


    async processTask(task: any, callback: async.ErrorCallback<any>) {
        const { jobDetail, item } = task;
        try {
            await this.performTask(jobDetail, item);
            this.completedTasks++
        } catch (error) {
            this.failedTasks++
            this.responseFile('F', item, error);
        } finally {
            this.pendingTasks--;
        }
    }

    private generateTasks(jobDetail, result): any[] {
        const tasks = [];
        result.forEach((item) => {
            tasks.push({ jobDetail, item });
        });
        return tasks;
    }

    async extrationIndividual(jobDetail, result): Promise<any> {

        const tasks = this.generateTasks(jobDetail, result);
        // const taskWithCallback = (task, callback) => {
        //     this.processTask(task, callback);
        // };
        return new Promise((resolve, reject) => {
            if (tasks.length) {
                this.totalTasks = tasks.length;
                this.queue.push(tasks);
                this.startQueueReporting(jobDetail);
                this.queue.drain(() => {
                    this.clearLogAction();
                    resolve(true);
                });

                this.queue.error((error, task) => {
                    console.error('Error executing task:', error, task);
                });

            } else {
                this.clearLogAction();
                resolve(false)
            }

        });
        // return true;
    }

    clearLogAction(): void {
        clearInterval(this.intervalOfqueue);
    }

    startQueueReporting(jobDetail: jobDetail): void {
        this.clearLogAction();
        this.intervalOfqueue = setInterval(() => {
            this.sendReport(jobDetail);
            // console.log('Total tasks:', this.totalTasks);
            // console.log('Completed tasks:', this.completedTasks);
            // console.log('Failed tasks:', this.failedTasks);
            // console.log('Pending tasks:', this.pendingTasks);
        }, 5000);
    }


    sendReport(jobDetail: jobDetail) {

        try {
            this.logService.info(`ZIP-REPORT : identifier: ${jobDetail.identifier}, ${jobDetail.nJobid}, nMasterid: ${jobDetail.nUserid}   otalTasks: ${this.totalTasks}, completedTasks: ${this.completedTasks}, failedTasks: ${this.failedTasks}, pendingTasks: ${this.pendingTasks}`, this.logApp)
        } catch (error) {
        }
        this.utility.emit({ event: 'ZIP-REPORT', data: { identifier: jobDetail.identifier, nJobid: jobDetail.nJobid, nMasterid: jobDetail.nUserid, totalTasks: this.totalTasks, completedTasks: this.completedTasks, failedTasks: this.failedTasks, pendingTasks: this.pendingTasks } });

    }

    async failedTask(nJobid: number): Promise<any> {
        // update failed tasks to db
        console.log('Failed task ', nJobid);

        try {
            this.logService.info(`Failed task :  ${nJobid}`, this.logApp)
        } catch (error) {
        }
        try {
            this.zipFile.close();
        } catch (error) {
            console.log('Failed to close zip file', error);
        }
        await this.fileInfo.jobFailed(nJobid);
        return true;
    }


    private async performTask(jobDetail, item): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            this.zipFile;
            let entry = await this.findEntry(item.path);
            if (entry) {
                const Fpath = path.resolve(this.config.get('ASSETS'), item.cSavepath);
                const success = await this.movefiles(entry, Fpath);
                if (success) {
                    // await this.wait(5000);
                    const verificationResult: FileValidateResponse = await this.fileVerificationService.verifyFile(Fpath, true);
                    console.log('Verification complete:', verificationResult);

                    item = Object.assign(item, verificationResult)
                    this.responseFile(verificationResult.isValidate ? 'C' : 'V', item);
                    resolve(true);
                } else {
                    this.responseFile('F', item);
                    resolve(false);
                }
            } else {
                resolve(false)
                console.log('Entry not found');
            }


        })


        // Simulating an asynchronous task
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        // console.log(`Processing item: ${JSON.stringify(item)}`);
    }


    async wait(tm): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, tm);
        });
    }


    async movefiles(entry: any, outputDirectory: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.zipFile.openReadStream(entry, (err: Error, readStream: Stream) => {
                if (err) {

                    try {
                        this.logService.error(`FAILED TO MOVE :  ${JSON.stringify(err)}`, this.logApp)
                    } catch (error) {
                    }
                    console.log('FAILED TO MOVE', err);
                    resolve(false);
                    return;
                }

                const writeStream = fs.createWriteStream(outputDirectory);

                readStream.pipe(writeStream);

                writeStream.on('close', () => {
                    resolve(true);
                });

                readStream.on('error', (err: Error) => {
                    try {
                        this.logService.error(`FAILED TO MOVE :  ${JSON.stringify(err)}`, this.logApp)
                    } catch (error) {
                    }
                    console.log('FAILED TO MOVE', err);
                    resolve(false);
                });

                writeStream.on('error', (err: Error) => {
                    try {
                        this.logService.error(`FAILED TO MOVE :  ${JSON.stringify(err)}`, this.logApp)
                    } catch (error) {
                    }
                    console.log('FAILED TO MOVE', err);
                    resolve(false);
                });
            });
        });
    }

    async findEntry(path: any): Promise<any> {
        let res = this.files.find((a) => a.path == path);
        return res ? res.entry : false;
    }


    async responseFile(status: string, item: any, error?: any) {
        console.log(`File move ${status == 'C' ? 'completed' : 'failed'}`, error);
        this.movedFiles.push(Object.assign(item, { cStatus: status }));
    }


    async saveFinal(nJobid: number) {

        // let list = this.movedFiles.map(({ nBundledetailid, cStatus, isValidate, totalpages, totalsizeoffile, pagerotation }) => ({ nBundledetailid, cStatus, isValidate, totalpages, totalsizeoffile, pagerotation }))
        try {
            let list = this.movedFiles.map((e) => {
                return {
                    nBundledetailid: e.nBundledetailid,
                    status: e.status,
                    isValidate: e.isValidate,
                    totalpages: e.totalpages,
                    totalsizeoffile: e.totalsizeoffile,
                    pagerotation: e.pagerotation ? e.pagerotation : "0"
                };
            });


            if (list.length) {
                return await this.fileInfo.finalUpdate({
                    nJobid: nJobid,
                    jFiles: JSON.stringify(list)
                })
            } else {

                return await this.failedTask(nJobid);
            }
        } catch (error) {

            return await this.failedTask(nJobid);
        }


    }
}
