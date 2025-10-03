import { Injectable } from '@nestjs/common';
import { UserConnection } from '../../interfaces/socket.interface';
import { Server } from 'socket.io';

@Injectable()
export class UsersService {

    private server: Server;
    public setServer(server: Server) {
        this.server = server;
    }
    private userConnections: Map<string, UserConnection> = new Map();



    async setUser(nUserid: string, obj: UserConnection) {
        this.userConnections.set(nUserid.toString(), obj);
    }

    async getUser(nUserid: string): Promise<any> {
        if (nUserid) {
            return this.userConnections.get(nUserid.toString())
        } else {
            console.log('User not found')
            return null;
        }

    }

    async getUserSocket(nUserid: string): Promise<any> {


        if (nUserid) {

            let urs = this.userConnections.get(nUserid.toString())
            return urs ? urs.socketId : null;
        } else {
            console.log('User not found')
            return null;
        }
    }



    async removeUser(nUserid: string): Promise<any> {
        this.userConnections.delete(nUserid.toString());
    }

    async getEntries(): Promise<any> {
        return this.userConnections.entries();
    }

    async emitMsg(value: any) {
        debugger;

        this.server.to(`U${value.data.nMasterid}`).emit("LOGIN-VERIFY", value);
       

    }

}
