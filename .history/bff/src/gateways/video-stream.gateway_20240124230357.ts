import { Logger } from '@nestjs/common/services/logger.service';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConsumerService } from 'src/kafka/consumer.service';

@WebSocketGateway()
export class VideoStreamGateway {
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('AppGateway');

  constructor(private readonly kafkaConsumerService: ConsumerService) {}

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('stream-stream')
  handleStream(@MessageBody() data: string): void {
    // Broadcast the stream to all clients except the sender
    console.log(data);
    client.broadcast.emit('stream', payload);
  }
}
