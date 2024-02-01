import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class VideoStreamGateway {
  @WebSocketServer()
  server: Server;

  sendStreamData(data: Buffer) {
    // Emit the video stream data to all connected clients
    this.server.emit('video-stream', data);
  }
}