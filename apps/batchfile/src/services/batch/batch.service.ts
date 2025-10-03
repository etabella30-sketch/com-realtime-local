import { DbService } from '@app/global/db/pg/db.service';
import { Injectable } from '@nestjs/common';
import { UtilityService } from '../../utility/utility.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { batchColumnReq, batchDwdpathReq, batchLogDetailReq, batchLogReq, batchLogRes, batchUploadReq, batchdownloadReq, batchdownloadRes } from '../../interfaces/batch.interface';
import * as path from 'path';
import { join } from 'path';
const XLSX = require('xlsx');
const filepath: string = './assets/'; // Path to save the generated Excel file

@Injectable()
export class BatchService {
    constructor(private db: DbService, readonly utility: UtilityService,
        @InjectQueue('batchfile-download') private taskQueue: Queue
    ) {

    }

    async getfiledata(body: batchdownloadReq): Promise<batchdownloadRes> {
        // body["ref"] = 2;
        let res = await this.db.executeRef('batchfile_getdata', body)
        try {
            if (res.success) {
                debugger
                const obj = {
                    "data": res.data[0],
                    "filename": body.cFilename,
                    column: body.column,
                    nCaseid: body.nCaseid,
                    nMasterid: body.nMasterid
                }
                // console.log('getfiledata', res.data);
                await this.taskQueue.add('process-task', obj);
                return { msg: 1, value: 'Batch File in process' };
            } else {
                return { msg: -1, value: 'Failed to fetch', error: res.error }
            }
        } catch (e) {
            return { msg: -1, value: 'Failed to fetch', error: res.error }
        }
        // return { msg: 1, value: 'Batch file generating' }
    }

    async getFilecolumn(body: batchColumnReq): Promise<batchdownloadRes> {
        let res = await this.db.executeRef('batchfile_columns', body)
        if (res.success) {
            return res.data[0];
        } else {
            return { msg: -1, value: 'Failed to fetch', error: res.error }
        }
    }

    async getUploadedFileCols(query: batchDwdpathReq): Promise<batchdownloadRes> {
        const filename: string = query.cPath;
        const filePath = path.join(filepath, filename);
        let res: batchdownloadRes = await this.uploadFileCols(filePath);
        try {
            return res;
        } catch (e) {
            return { msg: -1, value: 'Failed to fetch', error: e }
        }
    }


    async uploadfiledata(body: batchUploadReq): Promise<batchdownloadRes> {
        let path = filepath + body.cPath;
        try {
            console.log('Step 1', path);
            let res: batchdownloadRes = await this.readExceldata(path);
            console.log('Step 2', res.data.length);
            if (res && res["data"] && res["data"].length > 0) {
                body["filedata"] = JSON.stringify(res["data"]);
                let res2 = await this.db.executeRef('batchfile_update', body)
                try {
                    if (res2.success) {
                        return { msg: 1, value: 'Batch file uploaded' }
                    } else {
                        return { msg: -1, value: 'Failed to upload', error: res2.error }
                    }
                } catch (e) {
                    return { msg: -1, value: 'Failed to upload', error: res2.error }
                }
            } else {
                return { msg: -1, value: 'Failed to upload', error: 'No data found' }
            }
        } catch (e) {
            console.log('Step 3', e);
            return { msg: -1, value: 'Failed to upload', error: e }
        }


        let res = await this.db.executeRef('batchfile_upload', body)
        try {
            if (res.success) {
                return { msg: 1, value: 'Batch file uploaded' }
            } else {
                return { msg: -1, value: 'Failed to upload', error: res.error }
            }
        } catch (e) {
            return { msg: -1, value: 'Failed to upload', error: res.error }
        }
    }


    downloadFile(query: batchDwdpathReq, res: any) {
        const fileuri: string = query.cPath;
        const filePath = path.join(filepath, fileuri);
        res.download(filePath, fileuri, (err) => {
            if (err) {
                res.status(500).send({
                    message: 'Could not download the file. ' + err,
                });
            }
        });
    }



    async uploadFileCols(file): Promise<batchdownloadRes> {
        const workbook = XLSX.readFile(file);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const headers = this.getHeaders(worksheet);
        return { msg: 1, data: headers };
    }

    private getHeaders(worksheet): string[] {
        const headers = [];
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        const firstRow = range.s.r;
        for (let col = range.s.c; col <= range.e.c; ++col) {
            const cell = worksheet[XLSX.utils.encode_cell({ r: firstRow, c: col })];
            const header = cell ? cell.v : `UNKNOWN ${col}`;
            headers.push(header);
        }
        return headers;
    }

    async readExceldata(path): Promise<any> {
        try {
            const workbook = XLSX.readFile(path);
            const firstWorksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstWorksheetName];
            // Parse the worksheet to get an array of objects.
            // Each object corresponds to a row in the Excel file.
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            // for (let x of jsonData.filter(e => e["Date"] && e["Date"] != '')) {
            //     x["Date"] = getDate(x["Date"]);
            // }
            return { data: jsonData };

        } catch (error) {
            console.error('readExceldata', error)
            return { data: null }
        }

    }


    async getBatchlog(body: batchLogReq): Promise<batchLogRes> {
        let res = await this.db.executeRef('batchfile_log_summery', body)
        if (res.success) {
            return res.data;
        } else {
            return { msg: -1, value: 'Failed to fetch', error: res.error }
        }
    }


    async getBatchlogDetail(body: batchLogDetailReq): Promise<any> {
        let res = await this.db.executeRef('batchfile_log_detail', body)
        if (res.success) {
            return res.data;
        } else {
            return { msg: -1, value: 'Failed to fetch', error: res.error }
        }
    }

}
