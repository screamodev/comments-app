import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { File } from "../entities/file.entity";
import { Comment } from "../../comments/entities/comment.entity";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
    @InjectRepository(File) private filesRepository: Repository<File>,
    private eventEmitter: EventEmitter2,
    @InjectQueue("fileOptimizationQueue")
    private readonly fileOptimizationQueue: Queue,
  ) {}

  async preUploadFiles(files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException("No files provided.");
    }

    const jobIds = [];
    const uploadsDir = path.join(__dirname, "../../../db/uploads");

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    for (const file of files) {
      const uniqueFileName = `${uuidv4()}_${file.originalname}`;
      const filePath = path.join(uploadsDir, uniqueFileName);
      fs.writeFileSync(filePath, file.buffer);

      const job = await this.fileOptimizationQueue.add("optimizeFile", {
        filePath,
        originalname: uniqueFileName,
        mimetype: file.mimetype,
        fileSize: file.size,
      });

      jobIds.push(job.id);
      this.eventEmitter.emit("file.uploaded", {
        filename: uniqueFileName,
        jobId: job.id,
      });
    }

    return jobIds;
  }

  async attachFilesToComment(commentId: number, jobIds: string[]) {
    const comment = await this.commentsRepository.findOne({
      where: { id: commentId },
    });
    if (!comment) throw new BadRequestException("Invalid comment ID");

    const files = [];
    for (const jobId of jobIds) {
      const job = await this.fileOptimizationQueue.getJob(jobId);
      if (!job) {
        console.warn(`Job with ID ${jobId} not found.`);
        continue;
      }

      const { originalname, mimetype, fileSize } = job.data;
      const finalFilePath = path.join(
        __dirname,
        "../../../db/uploads",
        originalname,
      );

      const newFile = new File();
      newFile.filename = originalname;
      newFile.fileType = mimetype;
      newFile.fileSize = fileSize;
      newFile.url = finalFilePath;
      newFile.comment = comment;
      await this.filesRepository.save(newFile);

      files.push(newFile);
    }

    this.eventEmitter.emit("file.attached", { commentId, files });
    return files;
  }
}
