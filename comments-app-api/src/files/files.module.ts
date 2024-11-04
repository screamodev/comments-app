import { Module } from "@nestjs/common";
import {FileService} from "./services/file.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Comment} from "../comments/entities/comment.entity";
import {File} from "./entities/file.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Comment, File])],
  providers: [FileService],
  exports: [TypeOrmModule, FileService]
})
export class FilesModule {}
