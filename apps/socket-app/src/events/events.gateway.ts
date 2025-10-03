import { SubscribeMessage, WebSocketGateway, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
// import { UserConnection } from '../interfaces/socket.interface';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../guards/ws.guard';
import { LogService } from '@app/global/utility/log/log.service';
import { UsersService } from '../services/users/users.service';
import { UploadService } from '../services/upload/upload.service';
import { IndexService } from '../services/index/index.service';
import { PaginationService } from '../services/pagination/pagination.service';
import { BatchfileService } from '../services/batchfile/batchfile.service';

@WebSocketGateway({
  cors: {
    origin: '*'
  },
  path: '/socketservice/socket.io'
})
@UseGuards(WsJwtGuard)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private readonly logApplication:string = 'socket';
  constructor(private log: LogService, private user: UsersService, private upload: UploadService, private index: IndexService, private pagination: PaginationService, private batchfile: BatchfileService) { }

  afterInit(server: Server) {
    this.upload.setServer(server);
    this.index.setServer(server);
    this.user.setServer(server);
    this.pagination.setServer(server);
    this.batchfile.setServer(server);
  }


  async handleConnection(client: any, ...args: any[]) {
    const nUserid = client.handshake.query.nUserid as string;
    this.log.info(`User connected : ${nUserid}`,this.logApplication)
    this.user.setUser(nUserid, { socketId: client.id, rooms: new Set() })

    let urs = await this.user.getUserSocket(nUserid) //client.id
    // this.server.to(urs).emit('upload-messages', 'Welcome to the chat of socket');
    // this.user.userConnections.set(nUserid, { socketId: client.id, rooms: new Set() });
    // setInterval(() => {
    //   console.log('Sending message to user',urs);
    //   this.server.to(urs).emit('message', 'Welcome to the chat of socket');
    // }, 1000)
  }

  async handleDisconnect(client: any) {
    try {
      let entries: any[][] = await this.user.getEntries();
      const entry: any = Array.from(entries).find(([key, value]) => value.socketId === client.id);
      if (entry) {
        const [nUserid, userConnection] = entry;
        this.log.info(`User disconnected : ${nUserid}`,this.logApplication)
        userConnection.rooms.forEach(room => client.leave(room));
        this.user.removeUser(nUserid);
      }
    } catch (error) {
      this.log.error(`disconnect  : ${JSON.stringify(error)}`,this.logApplication)
    }
  }


  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket, callback: Function): void {
    this.log.info(`Message received : ${JSON.stringify(data)}`,this.logApplication)
    client.emit('message', data, () => {
      callback('Message processed');
    });
  }


  @SubscribeMessage('join-room')
  async handleJoinRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket): Promise<void> {
    const nUserid = client.handshake.query.nUserid as string;
    const userConnection = await this.user.getUser(nUserid); // this.user.userConnections.get(nUserid);
    if (userConnection) {
      client.join(data.room);
      userConnection.rooms.add(data.room);
      console.log('ROOM Join', data.room)
      this.log.info(`Client ${nUserid} joined room ${data.room}`,this.logApplication)
    }
  }


  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket): Promise<void> {
    const nUserid = client.handshake.query.nUserid as string;
    const userConnection = await this.user.getUser(nUserid); // this.user.userConnections.get(nUserid);
    if (userConnection) {
      client.leave(room);
      userConnection.rooms.delete(room);
      this.log.info(`Client ${nUserid} left room ${room}`,this.logApplication)
    }
  }




}
