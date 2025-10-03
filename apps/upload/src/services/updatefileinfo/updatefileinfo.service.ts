import { DbService } from '@app/global/db/pg/db.service';
import { Injectable } from '@nestjs/common';
import { saveFileInfoReq, startJob } from '../../interfaces/upload.interface';
import { jobDetail } from '../../interfaces/unzip.interface';

@Injectable()
export class UpdatefileinfoService {

    constructor(private db: DbService) {

    }

    async updateFileInfo(body: saveFileInfoReq): Promise<any> {
        let res = await this.db.executeRef('upload_updatefileinfo', body);
        if (res.success) {
            return res.data[0][0];
        } else {
            return { msg: -1, value: 'Failed to update', error: res.error }
        }
    }

    async jobStart(body: startJob): Promise<any> {
        let res = await this.db.executeRef('upload_unzip', body);
        if (res.success) {
            return res.data[0][0];
        } else {
            return { msg: -1, value: 'Failed to update', error: res.error }
        }
    }

    async getJobDetail(nJobid: number): Promise<any> {
        let res = await this.db.executeRef('upload_getjobdetail', { nJobid: nJobid });
        if (res.success) {
            if (res.data[0].length) {
                return res.data[0][0];
            }
            return { msg: -1, value: 'No job id found' }
        } else {
            return { msg: -1, value: 'Failed to update', error: res.error }
        }
    }

    async saveBundle(jobDetail: jobDetail, result: any[]) {
        let res = await this.db.executeRef('upload_unzip_extractation', { ...jobDetail, jFolders: JSON.stringify(result) });
        if (res.success) {
            return res.data[0];
        } else {
            return { msg: -1, value: 'Failed to update', error: res.error }
        }
    }

    async finalUpdate(detail: any) {
        let res = await this.db.executeRef('upload_unzip_update_bundledetail', detail);
        if (res.success) {
            return res.data[0][0];
        } else {
            return { msg: -1, value: 'Failed to update', error: res.error }
        }
    }


    async jobFailed(nJobid: number) {
        let res = await this.db.executeRef('upload_job_failed', {nJobid:nJobid, cStatus:'F'});
        if (res.success) {
            return res.data[0][0];
        } else {
            return { msg: -1, value: 'Failed to update', error: res.error }
        }
    }


}
