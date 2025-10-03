import { DbService } from '@app/global/db/pg/db.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { docID, docIDmulti, InsertDoc, resInsertDoc } from '../../interfaces/doc.interface';
import { query } from 'express';

@Injectable()
export class DoclinkService {

    constructor(private db: DbService) {

    }

    async insertDoc(body: InsertDoc): Promise<resInsertDoc> {
        let res = await this.db.executeRef('doc_insert', body);
        if (res.success) {
            return res.data[0][0];
        } else {
            return { msg: -1, value: 'Doc insert failed', error: res.error }
        }
    }


    async docDelete(body: docID): Promise<any> {
        try {
            const res = await this.db.executeRef('doc_delete', body);
            if (res.success) {
                return res.data[0];
            } else {
                return { msg: -1, value: 'Delete failed', error: res.error }
            }
        } catch (error) {
            return { msg: -1, value: 'Delete failed', error: error }
        }
    }


    async docDetail(query: docIDmulti): Promise<any> {
        try {
            query["res"] = 2
            const res = await this.db.executeRef('doc_detail', query);
            if (res.success) {
                return res.data[0];
            } else {
                return { msg: -1, value: 'Fetch failed', error: res.error }
            }
        } catch (error) {
            return { msg: -1, value: 'Fetch failed', error: error }
        }
    }


}
