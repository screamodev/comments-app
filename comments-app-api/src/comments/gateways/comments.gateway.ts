import {
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import {Injectable } from "@nestjs/common";
import {Comment} from "../entities/comment.entity";

@WebSocketGateway({ cors: { origin: '*' } })
@Injectable()
export class CommentsGateway {
  @WebSocketServer()
  server: Server;

  emitNewComment(comment: Comment) {
    this.server.emit('newComment', comment);
  }

  emitNewReply(reply: Comment) {
    this.server.emit('newReply', reply);
  }
}
