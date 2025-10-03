import { Inject, Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { UsersService } from '../users/users.service';


@Injectable()
export class BatchfileService {
    private server: Server;
    public setServer(server: Server) {
        this.server = server;
    }
    constructor(private user: UsersService) { }

    async emitMsg(value: any) {
        this.server.to(`U${value.data.nMasterid}`).emit("batchfile-messages", value);
    }
}
