import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { batchdownloadRes } from '../interfaces/batch.interface';
import { UtilityService } from '../utility/utility.service';
const XLSX = require('xlsx');

const filepath: string = './assets/'; // Path to save the generated Excel file

@Processor('batchfile-download')
export class QueueProcessor {
    constructor(private utility: UtilityService) { }
    @Process('process-task')
    async handleTask(job: Job) {
        try {
            await new Promise<void>(async (resolve, reject) => {
                const path = 'doc/case' + job.data.nCaseid + '/' + job.data.filename;
                await this.createExcelFile(job.data.data, (filepath + path), job.data.column);
                try {
                    console.log('Task processed');
                    this.utility.emit({ event: 'BATCH-PROGRESS', data: { identifier: '', nMasterid: job.data.nMasterid, data: { path: path, name: job.data.filename } } });
                } catch (error) {
                }
                resolve();
            })
            console.log('Task processed');
        } catch (error) {
            console.log('Task error', error);
        }
    }


    async generateData(data: any, column: string): Promise<any> {
        try {
            const bundle = [];
            const columns = JSON.parse(`[${column}]`);
            const length = columns.length;
            columns.splice(0, 0, ['ID', 'nBundledetailid'])
            bundle.push(columns.map(e => e[0]));
            data.forEach(element => {
                bundle.push(columns.map(e => element[e[1]]));
            });
            return [bundle, length];
        } catch (error) {
            console.log('error', error);
        }
    }



    async createExcelFile(bundle, path, column): Promise<batchdownloadRes> {
        console.log('Step 2', column);
        const [data, length] = await this.generateData(bundle, column);
        try {
            const ws = XLSX.utils.aoa_to_sheet(data);
            var margearray = [];
            let row = 1;
            while (true) {
                var cellAddress = `C${row}`;
                var cell = ws[cellAddress];
                var cellAddress2 = `G${row}`;
                var cell2 = ws[cellAddress2];
                if (!cell && !cell2) break;
                if (cell && cell.t && cell.t !== 'd') {
                    // const dateParts = cell.v.split('-');
                    // cell.v = new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]);
                    // cell.t = 'd';
                    // cell.z = XLSX.SSF.get_table()[14];  // Standard date format
                }

                if (cell2 && cell2.t && cell2.t !== 's' && cell2.v !== '') {
                    cell2.t = 's';
                }
                row++;
            }
            for (let key of Object.keys(ws).filter(e => (e).includes('A'))) {
                if (!ws[key]["v"]) {
                    var ind = Object.keys(ws).filter(e => (e).includes('A')).findIndex(e => e == key);
                    var boldkey = Object.keys(ws).filter(e => (e).includes('B'))[ind]
                    margearray.push({ s: { r: ind, c: 1 }, e: { r: ind, c: length } })
                }
            }


            ws['!merges'] = margearray;
            const wb = {
                SheetNames: ["Sheet1"],
                Sheets: {
                    Sheet1: ws
                }
            };
            XLSX.writeFile(wb, path);
            console.log('File saved', path);
            return { msg: 1, value: 'Batch File in process success' }
        } catch (error) {
            console.log('error', error);
            return { msg: -1, value: 'Batch File in process failed', error: error }
        }
    }


}