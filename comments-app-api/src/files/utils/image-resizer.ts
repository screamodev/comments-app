import { Injectable } from "@nestjs/common";
import * as sharp from "sharp";

@Injectable()
export class ImageResizer {
  static async resizeImage(
    buffer: Buffer,
    width: number,
    height: number,
  ): Promise<Buffer> {
    return await sharp(buffer).resize(width, height).toBuffer();
  }
}
