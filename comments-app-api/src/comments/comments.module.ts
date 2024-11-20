import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CacheModule } from "@nestjs/cache-manager";
import { CommentsService } from "./services/comments.service";
import { CommentsController } from "./controllers/comments.controller";
import { Comment } from "./entities/comment.entity";
import { FilesModule } from "../files/files.module";
import { CommentsGateway } from "./gateways/comments.gateway";

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    CacheModule.register(),
    FilesModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsGateway],
})
export class CommentsModule {}
