import { Logger } from '@nestjs/common/services/logger.service';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class VideoStreamGateway {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('message')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    console.log(data)
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'live-stream', data: item })),
    );
  }

  sendStreamData(data: Buffer) {
    this.logger.log(data);
    // Emit the video stream data to all connected clients
    this.server.emit('video-stream', data);
  }
}
