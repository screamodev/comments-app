import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CacheModule } from "@nestjs/cache-manager";
import { CommentsService } from "./services/comments.service";
import { CommentsController } from "./controllers/comments.controller";
import { Comment } from "./entities/comment.entity";
import { FilesModule } from "../files/files.module";
import { CommentsGateway } from "./gateways/comments.gateway";
import { User } from "../users/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, User]),
    CacheModule.register(),
    FilesModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsGateway],
})
export class CommentsModule {}
