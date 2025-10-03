import { Injectable } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SavedataService } from '@app/global/utility/savedata/savedata.service';
import { StreamDataService } from '@app/global/utility/stream-data/stream-data.service';
import { SessionService } from '../services/session/session.service';
import { IssueService } from '../services/issue/issue.service';
import { UsersService } from '../services/users/users.service';
import { getIssueAnnotationListBody } from '../interfaces/issue.interface';
import { SyncService } from '../services/sync/sync.service';
import { FeedDataService } from '../services/feed-data/feed-data.service';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*', // Configure according to your security requirements
  }
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private sessions = new Map<number, { sessionDate: string; currentPageData: any[]; pageNumber: number }>();

  constructor(private readonly streamDataService: StreamDataService, public savedataService: SavedataService, public sessionService: SessionService,
    private user: UsersService, private readonly issueService: IssueService, private syncService: SyncService, private feedData: FeedDataService) {
    // setInterval(() => {
    //   try {

    //     this.server.to(`U366`).emit('realtime-events', { type: 'issue-annot-added', data: {D:'A'} });
    //   } catch (error) {

    //   }
    // }, 1000);


  }

  afterInit(server: Server) {
    this.syncService.server = this.server;
    console.log('WebSocket server initialized');
  }

  async handleConnection(client: any, ...args: any[]) {
    const nUserid = client.handshake.query.nUserid as string;
    this.user.setUser(nUserid, { socketId: client.id, rooms: new Set() })
    console.log(`User connected : ${nUserid}`)
    let urs = await this.user.getUserSocket(nUserid) //client.id
    this.server.to(urs).emit('upload-messages', 'Welcome to the chat of socket');
    // this.user.userConnections.set(nUserid, { socketId: client.id, rooms: new Set() });
  }

  async handleDisconnect(client: any) {
    try {
      console.log('DISCONNECT', client.handshake.query, client.userroom);
      let entries: any[][] = await this.user.getEntries();
      try {
        this.streamDataService.stopDemoStream(client.id);
      } catch (error) {

      }

      try {
        if (client?.userroom && client?.userroom?.nSesid > 0) {
          this.sessionService.joiningLog({ nSesid: client?.userroom?.nSesid, nUserid: Number(client?.userroom?.nUserid), cStatus: 'L', cSource: 'L' });
        }
      } catch (error) {

      }
      const entry: any = Array.from(entries).find(([key, value]) => value.socketId === client.id);
      if (entry) {
        const [nUserid, userConnection] = entry;
        console.log(`User disconnected : ${nUserid}`)
        userConnection.rooms.forEach(room => client.leave(room));
        this.user.removeUser(nUserid);
      }
    } catch (error) {
      console.log(`disconnect  : ${JSON.stringify(error)}`)
    }
  }


  @SubscribeMessage('TCP-DATA')
  async handleTcpData(@MessageBody() msg: any) {
    console.log('TCP Data:', msg.p);
    // await this.saveData(msg);
    // await this.savedataService.saveData(msg, this.sessions, 'data', msg.p, msg.l);



    this.feedData.feedReceive(msg);

    // this.savedataService.saveLiveFeedData(msg, this.sessions, 'data');

    // console.log('Sending data to room:', `S${msg.date}`);
    this.server.to(`S${msg.date}`).emit('message', msg);
  }

  @SubscribeMessage('feed-refresh-data')
  async feedRefreshData(@MessageBody() msg: any) {
    console.log('TCP Refresh Data:');
    // await this.savedataService.saveRefresh(msg, this.sessions)

    this.feedData.refreshReceive(msg);

    // console.log('Sending data to room:', `S${msg.nSesid}`);
    this.server.to(`S${msg.nSesid}`).emit('feed-refresh-data', msg);
  }

  @SubscribeMessage('fetch-data')
  async fetchData(client: Socket, data: any) {
    console.log('\n\n\n\n\n\n Message from client 2:', data);
    const res = await this.issueService.getAnnotationOfPages({ nSessionid: data.nSesid, nUserid: data.nUserid, nCaseid: data.nCaseid, cTranscript: 'N' });
    // console.log('Annotation:', res);
    // return;
    /**/

    if (this.feedData.checkSessionExists(data.nSesid)) {
      this.feedData.streamSessionData(client.id, data, res[0], res[1]);
    } else {
      this.streamDataService.streamData('data', client.id, data, response => {
      }, res[0], res[1])
    }

    let dt = await this.sessionService.getSessiondata({ nSesid: data.nSesid, cUnicuserid: '' })
    // this.server.emit('session-detail', dt);
    console.log('EMIT SESSION DETAIOL')
    this.server.to(client.id).emit('session-detail', dt);
  }

  @SubscribeMessage('fetch-missing-page')
  async fetchMissingPage(client: Socket, data: any) {
    console.log('\n\n\n\n\n\n Message from client 2:', data);
    const res = await this.issueService.getAnnotationOfPages({ nSessionid: data.nSesid, nUserid: data.nUserid, nCaseid: data.nCaseid, cTranscript: 'N' });
    // console.log('Annotation:', res);
    // return;
    this.streamDataService.streamDataByPage('data', client.id, data, response => {
    }, res[0], res[1], data.pages)
    let dt = await this.sessionService.getSessiondata({ nSesid: data.nSesid, cUnicuserid: '' })
    // this.server.emit('session-detail', dt);
    console.log('EMIT SESSION DETAIOL')
    this.server.to(client.id).emit('session-detail', dt);
  }


  @SubscribeMessage('fetch-demo-data')
  async streamDemoData(client: Socket, data: any) {
    console.log('\n\n\n\n\n\n Message from client:', data);

    this.streamDataService.streamDemoData(client.id, data)

  }


  @SubscribeMessage('stop-demo-data')
  async stopDemoData(client: Socket, data: any) {
    this.streamDataService.stopDemoStream(client.id);
  }


  @SubscribeMessage('join-room')
  async handleJoinRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket): Promise<void> {
    console.log('Joining Room:', data);
    const nUserid = client.handshake.query.nUserid as string;
    // Check if the user is already in the room

    const rooms = Array.from(client.rooms);
    try {
      if (data.room.includes('S')) {
        const nSesid = parseInt(data.room.replace(/\D/g, ''))
        if (nSesid > 0) {
          client["userroom"] = { nSesid, nUserid: Number(data.nUserid) };
          this.sessionService.joiningLog({ nSesid: nSesid, nUserid: Number(data.nUserid), cStatus: 'J', cSource: 'L' });
        }
      }
    } catch (error) {
    }
    if (!rooms.includes(data.room)) {
      client.join(data.room);
      console.log('ROOM Join', data.room);
    } else {
      console.log('User already in the room', data.room);
    }
  }


  @SubscribeMessage('leave-room')
  async handleLeaveRoom(@MessageBody() room: any, @ConnectedSocket() client: Socket): Promise<void> {
    console.log('LEAVE')
    const nUserid = client.handshake.query.nUserid as string;


    try {
      if (room.room.includes('S')) {
        const nSesid = parseInt(room.room.replace(/\D/g, ''))
        if (nSesid > 0) {
          this.sessionService.joiningLog({ nSesid: nSesid, nUserid: Number(room.nUserid), cStatus: 'L', cSource: 'L' });
        }
      }
    } catch (error) {
    }

    client.leave(room);
    console.log('ROOM Leave', room)
  }


  @SubscribeMessage('lost-data')
  async fetchLostData(@MessageBody() msg: any) {
    try {
      console.log('RECEIVE LOST DATA:', msg.page, new Date());
      await this.savedataService.saveLostData(msg.data, msg.page, msg.nSesid);
      let newData = { ...msg };
      newData.data = JSON.stringify(newData.data);
      console.log('Sending lost data to room:', `S${msg.nSesid}`);
      this.server.to(`S${msg.nSesid}`).emit('previous-data', newData);


    } catch (error) {
      console.log('Error fetching lost data', error);
    }
  }

  @SubscribeMessage('issue-annot-added')
  async issueDetailAdded(@MessageBody() msg: any) {
    console.log('ISSUE Data:', msg, new Date());
    try {
      if (msg.nIDid) {
        const mdl: getIssueAnnotationListBody = { nIDid: msg.nIDid } as getIssueAnnotationListBody;
        const list = await this.issueService.getAnnotationOfPages(mdl);
        if (list?.length) {
          if (list[0]?.length) {

            console.log('Sending issue data to room:', `U${msg.nUserid}`, list[0][0]);
            this.server.to(`U${msg.nUserid}`).emit('realtime-events', { type: 'issue-annot-added', data: list[0][0] });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }

  }

}