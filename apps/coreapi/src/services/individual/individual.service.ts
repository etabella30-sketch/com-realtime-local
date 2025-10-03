import { DbService } from '@app/global/db/pg/db.service';
import { Injectable } from '@nestjs/common';
import { DocinfoReq, DocinfoRes, fetchTabDataReq, getTabReq, updateBundleDetailRotation } from '../../interfaces/individual.interface';

@Injectable()
export class IndividualService {

    constructor(private db: DbService) {

    }


    async getTabData(query: fetchTabDataReq): Promise<any> {
        let res = await this.db.executeRef('individual_tabs', query);
        if (res.success) {
            return res.data[0];
        } else {
            return { msg: -1, value: 'Failed ', error: res.error }
        }
    }


    async getTab(query: getTabReq): Promise<any> {
        let res = await this.db.executeRef('individual_prenext_id', query);
        if (res.success) {
            try {
                return res.data[0][0];
            } catch (error) {
                return { msg: -1, value: 'Failed ', error: res.error }
            }
        } else {
            return { msg: -1, value: 'Failed ', error: res.error }
        }
    }

    async getDocinfo(query: DocinfoReq): Promise<DocinfoRes> {
        let res = await this.db.executeRef('individual_doc_info', query);
        if (res.success) {
            try {
                return res.data[0][0];
            } catch (error) {
                return { msg: -1, value: 'Failed ', error: res.error }
            }
        } else {
            return { msg: -1, value: 'Failed ', error: res.error }
        }
    }


    async getglobalannotas(query: DocinfoReq): Promise<DocinfoRes> {
        let res = await this.db.executeRef('individual_annotations_global', query);
        if (res.success) {
            try {
                return res.data[0];
            } catch (error) {
                return { msg: -1, value: 'Failed ', error: res.error }
            }
        } else {
            return { msg: -1, value: 'Failed ', error: res.error }
        }
    }


    async updateRotation(body: updateBundleDetailRotation): Promise<any> {
        let res = await this.db.executeRef('individual_update_rotation', body);
        if (res.success) {
            return res.data[0];
        } else {
            return { msg: -1, value: 'Failed ', error: res.error }
        }
    }

}
