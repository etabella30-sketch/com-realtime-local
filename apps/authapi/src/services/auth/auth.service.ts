import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInReq, SignInResponce, SignInResponceUpdate, SignInRTReq, SignOutReq, SignOutResponce, UserInfoReq } from '../../interfaces/auth.interface';

import { DbService } from '@app/global/db/pg/db.service';
import { PasswordHashService } from '@app/global/utility/cryptography/password-hash.service';
import { RedisDbService } from '@app/global/db/redis-db/redis-db.service';
import { UtilityService } from '../../utility/utility.service';

@Injectable()
export class AuthService {
    expiry_token_limit_days = 3;
    constructor(private db: DbService, public passHash: PasswordHashService, private jwtService: JwtService,
         private readonly utility: UtilityService,
        private rds: RedisDbService
    ) { }

    async signIn(body: SignInReq): Promise<SignInResponce> {
        let res = await this.db.executeRef('signin', body);
        if (res.success) {
            if (!res.data[0] || !res.data[0].length) {
                return { msg: -1, value: 'Invalid User' };
            }
            let isVarify = await this.passHash.verifyPassword(body.password, res.data[0][0].cPassword);
            if (isVarify) {
                let token = await this.createToken(res.data[0][0].nUserid, body.cBroweserid);
                this.rds.setValue(`user/${res.data[0][0].nUserid}`, JSON.stringify({ id: body.cBroweserid, a: res.data[0][0].isAdmin || false }));

                const responce_update: SignInResponceUpdate = {
                    nMasterid: res.data[0][0].nUserid,
                    cToken: body.cToken,
                    cJwt: token,
                    bResponce: true
                }
                let fetched_res = await this.db.executeRef('signin_responce', responce_update);
                if (fetched_res.success) {


                    this.utility.emit({ event: 'LOGIN-VERIFY', data: { cBroweserid: body.cBroweserid, nMasterid: res.data[0][0].nUserid } });

                    return { msg: 1, value: 'login successfully', userDetail: fetched_res.data[0][0], token: token, expir_limit: this.expiry_token_limit_days };// userDetail;
                } else {
                    return { msg: -1, value: 'Failed to fetch user information' };
                }
            } else {
                return { msg: -1, value: 'Invalid password' };
            }

        } else {
            return { msg: -1, value: res.error };
        }
    }
    async signInRT(body: SignInRTReq): Promise<SignInResponce> {
        let res = await this.db.executeRef('signin_rt', body);
        if (res.success) {
            if (!res.data[0] || !res.data[0].length) {
                return { msg: -1, value: 'Invalid User' };
            }
                    return { msg: 1, value: 'login successfully', userDetail: res.data[0], expir_limit: this.expiry_token_limit_days };// userDetail;
               
        } else {
            return { msg: -1, value: res.error };
        }
    }

    async signOut(body: SignOutReq): Promise<SignOutResponce> {

        await this.db.executeRef('signout', body);

        try {
            this.rds.deleteValue(`user/${body.nMasterid}`);
        } catch (error) {

        }
        return { msg: 1, value: 'User signout!' };
    }


    async fetchUserInfo(body: UserInfoReq): Promise<SignInResponce> {
        let fetched_res = await this.db.executeRef('userdetail', body);
        if (fetched_res.success) {
            const userDetail: SignInResponce = fetched_res.data[0][0];
            return userDetail;
        } else {
            return { msg: -1, value: 'Failed to fetch user information' };
        }

    }


    async createToken(userId: number, broweserId: string) {
        const payload = { userId, broweserId };
        return this.jwtService.sign(payload, {
            expiresIn: '2d', // Token expires in 2 days
        });
    }

}
