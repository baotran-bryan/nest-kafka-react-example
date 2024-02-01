import { Logger } from '@nestjs/common/services/logger.service';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class VideoStreamGateway {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('stream')
  handleStream(client: Socket, payload: string): void {
    // Broadcast the stream to all clients except the sender
    console.log(payload);
    client.broadcast.emit('stream', payload);
  }
}
