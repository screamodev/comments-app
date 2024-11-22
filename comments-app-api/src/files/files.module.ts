import { Module } from "@nestjs/common";
import { FileService } from "./services/file.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "../comments/entities/comment.entity";
import { File } from "./entities/file.entity";
import { BullModule } from "@nestjs/bull";
import { FileOptimizationProcessor } from "./processors/file-optimization.processor";
import { FileEventHandler } from "./events/file-event.handlers";

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, File]),
    BullModule.registerQueue({
      name: "fileOptimizationQueue",
    }),
  ],
  providers: [FileService, FileOptimizationProcessor, FileEventHandler],
  exports: [TypeOrmModule, FileService, BullModule],
})
export class FilesModule {}
