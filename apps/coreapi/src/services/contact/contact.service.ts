import { DbService } from '@app/global/db/pg/db.service';
import { Injectable } from '@nestjs/common';
import { CRBuilderReq, CRBuilderRes, CompanyBuilderReq, CompanyBuilderRes, CompanyReq, CompanyRes, ContactBuilderReq, ContactBuilderRes, ContactReq, ContactRes, ContactlsReq, ContactlsRes, ContactroleReq, ContactroleRes } from '../../interfaces/contact.interface';

@Injectable()
export class ContactService {
    constructor(private db: DbService) {

    }


    async getContactlist(query: ContactlsReq): Promise<ContactlsRes[]> {
        let res = await this.db.executeRef('contact_list', query);
        if (res.success) {
            try {
                return res.data[0];
            } catch (error) {
                return [{ msg: -1, value: 'Failed ', error: res.error }]
            }
        } else {
            return [{ msg: -1, value: 'Failed ', error: res.error }]
        }
    }



    async getContactDetail(query: ContactReq): Promise<ContactRes> {
        let res = await this.db.executeRef('contact_detail', query);
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



    async contactBuilder(body: ContactBuilderReq): Promise<ContactBuilderRes> {
        let res = await this.db.executeRef('contactbuilder', body);
        if (res.success) {
            return res.data[0][0];
        } else {
            return { msg: -1, value: 'Creation failed', error: res.error }
        }
    }

    async getCompanylist(query: CompanyReq): Promise<CompanyRes[]> {
        let res = await this.db.executeRef('company_list', query);
        if (res.success) {
            try {
                return res.data[0];
            } catch (error) {
                return [{ msg: -1, value: 'Failed ', error: res.error }]
            }
        } else {
            return [{ msg: -1, value: 'Failed ', error: res.error }]
        }
    }


    async companyBuilder(body: CompanyBuilderReq): Promise<CompanyBuilderRes> {
        let res = await this.db.executeRef('companybuilder', body);
        if (res.success) {
            return res.data[0][0];
        } else {
            return { msg: -1, value: 'Creation failed', error: res.error }
        }
    }

    async getContactrolelist(query: ContactroleReq): Promise<ContactroleRes[]> {
        let res = await this.db.executeRef('contact_rolelist', query);
        if (res.success) {
            try {
                return res.data[0];
            } catch (error) {
                return [{ msg: -1, value: 'Failed ', error: res.error }]
            }
        } else {
            return [{ msg: -1, value: 'Failed ', error: res.error }]
        }
    }


    async contactroleBuilder(body: CRBuilderReq): Promise<CRBuilderRes> {
        let res = await this.db.executeRef('contact_rolebuilder', body);
        if (res.success) {
            return res.data[0][0];
        } else {
            return { msg: -1, value: 'Creation failed', error: res.error }
        }
    }

}
