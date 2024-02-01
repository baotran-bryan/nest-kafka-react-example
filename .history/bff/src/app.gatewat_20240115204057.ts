import { WebSocketGateway, WebSocketServer, OnGatewayInit} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    // Initialize WebSocket server
  }

  broadcastMessage(message: string) {
    this.server.emit('message', message);
  }
}
