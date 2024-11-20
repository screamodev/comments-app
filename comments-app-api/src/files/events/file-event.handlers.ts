import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class FileEventHandler {
  @OnEvent("file.uploaded")
  handleFileUploadedEvent(payload: { filename: string; jobId: string }) {
    console.log(
      `File ${payload.filename} uploaded with job ID ${payload.jobId}`,
    );
  }

  @OnEvent("file.optimized")
  handleFileOptimizedEvent(payload: {
    filePath: string;
    originalname: string;
    jobId: string;
  }) {
    console.log(
      `File ${payload.originalname} optimized and saved at ${payload.filePath}`,
    );
  }
}
