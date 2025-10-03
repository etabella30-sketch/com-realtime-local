import { DbService } from '@app/global/db/pg/db.service';
import { RedisDbService } from '@app/global/db/redis-db/redis-db.service';
import { PasswordHashService } from '@app/global/utility/cryptography/password-hash.service';
import { Injectable } from '@nestjs/common';
import { TeamBuilderReq, TeamBuilderRes, UserBuilderReq, UserBuilderRes, teamSetup, teamSetupRes, UserDeleteReq, UserDeleteRes, TeamDeleteReq, TeamDeleteRes } from 'apps/coreapi/src/interfaces/team-setup.interface';

@Injectable()
export class TeamSetupService {

    constructor(private db: DbService, private passHash: PasswordHashService, public rds: RedisDbService) {

    }


    async caseBuilder(body: TeamBuilderReq): Promise<TeamBuilderRes> {
        let res = await this.db.executeRef('teambuilder', body);
        if (res.success) {
            return res.data[0][0];
        } else {
            return { msg: -1, value: 'Creation failed', error: res.error }
        }
    }

    
    async deleteTeam(body: TeamDeleteReq): Promise<TeamDeleteRes> {
        body.permission = 'D';
        let res = await this.db.executeRef('teambuilder', body);
        if (res.success) {
            return res.data[0][0];
        } else {
            return { msg: -1, value: 'Deletion failed', error: res.error }
        }
    }

    async userBuilder(body: UserBuilderReq): Promise<UserBuilderRes> {
        try {
            if (body.cPassword) {
                body.cPassword = await this.passHash.hashPassword(body.cPassword);
            }
            let res = await this.db.executeRef('userbuilder', body);
            if (res.success) {
                if (body.nTeamid) {
                    let teamObj = Object.assign(body, { nUserid: res.data[0][0]["nUserid"] });
                    await this.db.executeRef('user_team_management', teamObj);
                }
                return res.data[0][0];
            } else {
                return { msg: -1, value: 'Creation failed', error: res.error }
            }
        } catch (error) {
            return { msg: -1, value: 'Creation failed', error: error }
        }

    }


    async teamAssignment(body: teamSetup): Promise<teamSetupRes> {
        try {
            let res = await this.db.executeRef('admin_case_teamsetup', body);
            if (res.success) {
                /*this.db.executeRef('admin_case_teamsetup_permissions', { nCaseid: body.nCaseid, nMasterid: body.nMasterid }).then(() => {
                    console.log('Background task completed successfully');
                }).catch((error) => {
                    console.error('Background task failed', error);
                });*/
                return res.data[0][0];
            } else {
                return { msg: -1, value: 'Update failed', error: res.error }
            }
        } catch (error) {
            return { msg: -1, value: 'Update failed', error: error }
        }

    }


    async deleteUser(body: UserDeleteReq): Promise<UserDeleteRes> {
        let res = await this.db.executeRef('userbuilder', body);
        if (res.success) {
            // call another service for 
            try {
                this.rds.deleteValue(`user/${body.nUserid}`);
                
            } catch (error) {

            }
            return res.data[0][0];
        } else {
            return { msg: -1, value: 'Failed to fetch', error: res.error }
        }
    }



}
