import { Processor, Process } from "@nestjs/bull";
import { Job } from "bull";
import { EventEmitter2 } from "@nestjs/event-emitter";
import * as fs from "fs";
import * as path from "path";
import { ImageResizer } from "../utils/image-resizer";

@Processor("fileOptimizationQueue")
export class FileOptimizationProcessor {
  constructor(private eventEmitter: EventEmitter2) {}

  @Process("optimizeFile")
  async optimizeFile(job: Job) {
    const { filePath, originalname, mimetype } = job.data;
    let finalFilePath = filePath;

    if (mimetype.startsWith("image/")) {
      const resizedImageBuffer = await ImageResizer.resizeImage(
        fs.readFileSync(filePath),
        320,
        240,
      );
      finalFilePath = path.join(path.dirname(filePath), originalname);
      fs.writeFileSync(finalFilePath, resizedImageBuffer);
    }

    this.eventEmitter.emit("file.optimized", {
      filePath: finalFilePath,
      originalname,
      mimetype,
      jobId: job.id,
    });

    return finalFilePath;
  }
}
