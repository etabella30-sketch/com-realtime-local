import { DbService } from '@app/global/db/pg/db.service';
import { Injectable } from '@nestjs/common';
import { getpaginationReq, getpaginationRes, paginationReq, paginationRes, stoppaginationReq } from '../../interfaces/pagination/pagination.interface';
import { UtilityService } from '../../utility/utility.service';

const { spawn } = require("child_process");
const editfilepath = 'assets/pythons/pagination/editfile.py';

@Injectable()
export class PaginationdataService {
    paginationProcess = [];
    constructor(private db: DbService, readonly utility: UtilityService) { }


    async getPagination(query: getpaginationReq): Promise<getpaginationRes> {
        console.log('getPagination 2', this.paginationProcess)
        let ind = this.paginationProcess.findIndex(e => e.nCaseid == query.nCaseid && e["isProcess"] == true);
        if (ind > -1) {
            query.nPtaskid = this.paginationProcess[ind].nPtaskid;
            let res = await this.db.executeRef('pagination_getdata', query);
            if (res.success) {
                return res.data[0];
            } else {
                return { msg: -1, value: 'Failed to fetch', error: res.error }
            }
        } else {
            return { msg: 0, value: 'No Pagination in process' };
        }
    }


    async getPaginationData(body: paginationReq): Promise<paginationRes> {
        // this.paginationProcess = [];
        let res = await this.db.executeRef('pagination_generatedata', body)
        try {
            if (res.success) {
                this.processPaginationData(res, body);
                return { msg: 1, value: 'File Pagination in process' };
            } else {
                return { msg: -1, value: 'Failed to fetch', error: res.error }
            }
        } catch (e) {
            return { msg: -1, value: 'Failed to fetch', error: res.error }
        }
    }

    processPaginationData(res, body) {
        const { jsonData, nCaseid, nPtaskid, jUsers } = res.data[0][0];
        try {
            if (!this.paginationProcess.find(e => e.nCaseid == nCaseid && e["isProcess"] == true)) {
                this.paginationProcess.push({ "nPtaskid": nPtaskid, "isProcess": true, nCaseid: nCaseid, jsonData: jsonData, jUsers: jUsers });
                console.log('getPagination', this.paginationProcess)
                this.processJsonData(this.paginationProcess.find(e => e.nPtaskid == nPtaskid)["jsonData"], nPtaskid, body.nMasterid)
                    .then(() => {
                        var ind = this.paginationProcess.findIndex(e => e.nPtaskid == nPtaskid);
                        this.update_final(nPtaskid, body.nMasterid, 'C');
                        this.paginationProcess.splice(ind, 1);
                    })
                    .catch((error) => {
                        var ind = this.paginationProcess.findIndex(e => e.nPtaskid == nPtaskid);
                        this.update_final(nPtaskid, body.nMasterid, 'F');
                        this.paginationProcess.splice(ind, 1);
                        console.log("Error:", error);
                    });
            } else {
                this.paginationProcess.filter(e => e["isProcess"] == true && e.nCaseid == nCaseid).map(e => {
                    jsonData.map(x => x["nNPtaskid"] = nPtaskid)
                    Array.prototype.splice.apply(e.jsonData, [e.jsonData.length, 0].concat(jsonData));
                    this.add_inqueue(nPtaskid, e.nPtaskid);
                });
                console.log(this.paginationProcess.find(e => e.nCaseid == nCaseid && e["isProcess"] == true));
            }
        } catch (e) {
            console.log("error", e);
        }

    }





    add_inqueue(nPtaskid, nQPtaskid) {
        let res = this.db.executeRef('pagination_add_queue', { nPtaskid: nPtaskid, nQPtaskid: nQPtaskid })

    }

    async processJsonData(jsonData, nPtaskid, nMasterid) {
        for (const [index, element] of jsonData.entries()) {
            await new Promise<void>((resolve, reject) => {
                this.editFile(element, (flag) => {
                    console.log(element.cRefpage)
                    this.update_progress(nPtaskid, nMasterid, element, flag ? 'C' : 'F')
                    console.log(index, jsonData.length)
                    resolve();
                });
            });

            if (this.paginationProcess.find(e => e.nPtaskid == nPtaskid) && !this.paginationProcess.find(e => e.nPtaskid == nPtaskid)["isProcess"]) {
                console.log('break', nPtaskid)
                break;
            }
        }
    }


    editFile(jsonData, cb) {
        // print_log(`Start file ${new Date().toISOString(), jsonData.cPath}`)
        console.log('step 2');
        const pythonProcess = spawn("python", [editfilepath, JSON.stringify(jsonData)]);
        pythonProcess.stdout.on("data", (data) => {
            console.log('step 3 res', data.toString().trim());
        });
        pythonProcess.stderr.on("data", (data) => {
            console.log(data.toString().trim())
            // print_log(`stderr: ${data.toString().trim()}`);
        });
        pythonProcess.on("close", (code) => {
            if (code === 0) {
                console.log('step 3 res', code.toString().trim());
                // print_log(`end file ${new Date().toISOString(), jsonData.cPath}`)
                cb(true);
            } else {
                console.log('step 3 res', code.toString().trim());
                // print_log(`Python script failed with code ${code}`);
                // reject(new Error(`Python script failed with code ${code}`));
                cb(false);
            }
        });
    }


    async update_progress(nPtaskid, nMasterid, mdl, flag) {

        let res = await this.db.executeRef('pagination_update_progress', { nMasterid: nMasterid, nPtaskid: nPtaskid, nID: mdl.nID, cStatus: flag, isComplete: false, cRefpage: mdl["cRefpage"] });

        if (res.data && res.data.length) {
            let data = res.data[0]
            var obj = {
                nID: mdl.nID,
                nPtaskid: nPtaskid,
                nNPtaskid: mdl["nNPtaskid"],
                comp_progres: data[0]["comp_progres"],
                total_prog: data[0]["total_prog"],
                cType: 'P', // process
                cRefpage: mdl["cRefpage"], // process
                jPagination: mdl["jPagination"], // process
                cStatus: data[0]["cStatus"],
                nCaseid: data[0]["nCaseid"],
            };

            for (let user of data[0].jUsers) {
                this.utility.emit({ event: 'PAGINATION-PROGRESS', data: { identifier: '', nMasterid: user, data: obj } });
            }
        }
        // for (let user of data[0].jUsers) {
        //     this.utility.emit({ event: 'PAGINATION-PROGRESS', data: { identifier: '', nMasterid: nMasterid, data: obj } });
        // }


    }

    async update_final(nPtaskid, nMasterid, flag) {

        let res = await this.db.executeRef('pagination_update_progress', { nPtaskid: nPtaskid, cStatus: flag, isComplete: true });

        if (res.data && res.data.length) {
            let data = res.data[0]
            //  console.log('EXPORT-PROGRESS', data[0])
            try {
                var obj = {
                    rec_type: 'PAGINATION-PROGRESS',
                    nPtaskid: nPtaskid,
                    cType: 'F', // final
                    cStatus: data[0]["cStatus"],
                    nUserid: nMasterid,
                    nCaseid: data[0]["nCaseid"],
                };
                for (let user of data[0].jUsers) {
                    this.utility.emit({ event: 'PAGINATION-PROGRESS', data: { identifier: '', nMasterid: user, data: obj } });
                }

            } catch (error) {

                console.log('final PAGINATION-PROGRESS', error)

            }
        }
    }


    async stopPaginationData(body: stoppaginationReq): Promise<paginationRes> {
        this.update_final(body.nPtaskid, body.nMasterid, 'S');
        return { msg: 1, value: 'File Pagination in process' };
    }
}