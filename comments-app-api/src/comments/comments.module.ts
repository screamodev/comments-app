import { Module } from "@nestjs/common";
import { CommentsService } from "./services/comments.service";
import { CommentsController } from "./controllers/comments.controller";
import {User} from "../users/entities/user.entity";
import {Comment} from "./entities/comment.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
