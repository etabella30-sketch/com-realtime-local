import { DbService } from '@app/global/db/pg/db.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { factDetail, factDetailSingle, InsertFact, InsertQuickFact, resInsertData, resInsertFact } from '../../interfaces/fact.interface';

@Injectable()
export class FactService {
    constructor(private db: DbService) { }

    async insertFact(body: InsertFact): Promise<resInsertFact> {
        try {
            const res = await this.db.executeRef('fact_insert', body);
            if (res.success) {
                return res.data[0][0];
            } else {
                return { msg: -1, value: 'Failed ', error: res.error }
            }
        } catch (error) {
            return { msg: -1, value: 'Failed ', error: error }
        }
    }

    async insertFactDetail(body: any): Promise<any> {
        try {
            const res = await this.db.executeRef('fact_insert_detail', body);
            if (res.success) {
                return res.data[0];
            } else {
                return { msg: -1, value: 'Fact detail insert failed ', error: res.error }
            }
        } catch (error) {
            return { msg: -1, value: 'Fact detail insert failed ', error: error }
        }
    }

    async insertFactlink(body: any): Promise<any> {
        try {
            const res = await this.db.executeRef('fact_insert_links', body);
            if (res.success) {
                return true;
            } else {
                return { msg: -1, value: 'Fact link insert failed ', error: res.error }
            }
        } catch (error) {
            return { msg: -1, value: 'Fact link insert failed ', error: error }
        }
    }

    async insertFactissues(body: any): Promise<any> {
        try {
            const res = await this.db.executeRef('fact_insert_issues', body);
            if (res.success) {
                return true;
            } else {
                return { msg: -1, value: 'Fact issues insert failed ', error: res.error }
            }
        } catch (error) {
            return { msg: -1, value: 'Fact issues insert failed ', error: error }
        }
    }

    async insertFactcontact(body: any): Promise<any> {
        try {
            const res = await this.db.executeRef('fact_insert_contact', body);
            if (res.success) {
                return true;
            } else {
                return { msg: -1, value: 'Fact contact insert failed ', error: res.error }
            }
        } catch (error) {
            return { msg: -1, value: 'Fact contact insert failed ', error: error }
        }
    }

    async insertFacttask(body: any): Promise<any> {
        try {
            const res = await this.db.executeRef('fact_insert_task', body);
            if (res.success) {
                return true;
            } else {
                return { msg: -1, value: 'Fact task insert failed ', error: res.error }
            }
        } catch (error) {
            return { msg: -1, value: 'Fact task insert failed ', error: error }
        }
    }

    async insertFactteam(body: any): Promise<any> {
        try {
            const res = await this.db.executeRef('fact_insert_team', body);
            if (res.success) {
                return true;
            } else {
                return { msg: -1, value: 'Fact team insert failed ', error: res.error }
            }
        } catch (error) {
            return { msg: -1, value: 'Fact team insert failed ', error: error }
        }
    }

    async getFactdetail(query: factDetail): Promise<resInsertData> {
        try {
            const res = await this.db.executeRef('fact_get_detail', query);
            if (res.success) {
                return res.data[0];
            } else {
                return { msg: -1, value: 'Fetch failed', error: res.error }
            }
        } catch (error) {
            return { msg: -1, value: 'Fetch failed', error: error }
        }
    }

    async getFactIssue(query: factDetailSingle): Promise<resInsertData> {
        try {
            const res = await this.db.executeRef('fact_get_issue', query);
            if (res.success) {
                return res.data[0];
            } else {
                return { msg: -1, value: 'Fetch failed', error: res.error }
            }
        } catch (error) {
            return { msg: -1, value: 'Fetch failed', error: error }
        }
    }

    async getFactlinks(query: factDetailSingle): Promise<resInsertData> {
        try {
            const res = await this.db.executeRef('fact_get_links', query);
            if (res.success) {
                return res.data[0];
            } else {
                return { msg: -1, value: 'Fetch failed', error: res.error }
            }
        } catch (error) {
            return { msg: -1, value: 'Fetch failed', error: error }
        }
    }

    async getFactcontact(query: factDetailSingle): Promise<resInsertData> {
        try {
            const res = await this.db.executeRef('fact_get_contact', query);
            if (res.success) {
                return res.data[0];
            } else {
                return { msg: -1, value: 'Fetch failed', error: res.error }
            }
        } catch (error) {
            return { msg: -1, value: 'Fetch failed', error: error }
        }
    }

    async getFactshared(query: factDetailSingle): Promise<resInsertData> {
        try {
            const res = await this.db.executeRef('fact_get_shared', query);
            if (res.success) {
                return res.data[0];
            } else {
                return { msg: -1, value: 'Fetch failed', error: res.error }
            }
        } catch (error) {
            return { msg: -1, value: 'Fetch failed', error: error }
        }
    }

    async getFacttask(query: factDetailSingle): Promise<resInsertData> {
        try {
            const res = await this.db.executeRef('fact_get_task', query);
            if (res.success) {
                return res.data[0];
            } else {
                return { msg: -1, value: 'Fetch failed', error: res.error }
            }
        } catch (error) {
            return { msg: -1, value: 'Fetch failed', error: error }
        }
    }

    async getFactIssuelinks(query: factDetail): Promise<resInsertData> {
        try {
            query["ref"] = 2;
            const res = await this.db.executeRef('fact_get_issue_links', query);
            if (res.success) {
                return res.data;
            } else {
                return { msg: -1, value: 'Fetch failed', error: res.error }
            }
        } catch (error) {
            return { msg: -1, value: 'Fetch failed', error: error }
        }
    }

    async FactDelete(body: factDetailSingle): Promise<resInsertData> {
        try {
            const res = await this.db.executeRef('fact_delete', body);
            if (res.success) {
                return res.data[0];
            } else {
                return { msg: -1, value: 'Delete failed', error: res.error }
            }
        } catch (error) {
            return { msg: -1, value: 'Delete failed', error: error }
        }
    }


    async insertQuickFact(body: InsertQuickFact): Promise<any> {
        try {
            const res = await this.db.executeRef('fact_insert', body);
            if (res.success) {
                return res.data[0][0];
            } else {
                return { msg: -1, value: 'Fact insert  failed', error: res.error }
            }
        } catch (error) {
            return { msg: -1, value: 'Fact insert  failed', error: error }
        }
    }

}
