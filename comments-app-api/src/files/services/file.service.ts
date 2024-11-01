import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../entities/file.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { ImageResizer } from '../utils/image-resizer';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
        @InjectRepository(File) private filesRepository: Repository<File>,
    ) {}

    async uploadFiles(commentId: number, files: Express.Multer.File[]) {
        const comment = await this.commentsRepository.findOneBy({ id: commentId });

        if (!comment) {
            throw new BadRequestException('Invalid comment ID');
        }

        const savedFiles = [];

        for (const file of files) {
            const newFile = new File();
            newFile.comment = comment;

            if (file.mimetype.startsWith('image/')) {
                const resizedImageBuffer = await ImageResizer.resizeImage(file.buffer, 320, 240);
                const uploadsDir = path.join(__dirname, '../../../db/uploads');

                if (!fs.existsSync(uploadsDir)) {
                    fs.mkdirSync(uploadsDir, { recursive: true });
                }

                const imagePath = path.join(uploadsDir, file.originalname);
                fs.writeFileSync(imagePath, resizedImageBuffer);

                newFile.filename = file.originalname;
                newFile.fileType = file.mimetype;
                newFile.fileSize = file.size;
                newFile.url = imagePath;
            }

            if (file.mimetype === 'text/plain') {
                const uploadsDir = path.join(__dirname, '../../../db/uploads');

                if (!fs.existsSync(uploadsDir)) {
                    fs.mkdirSync(uploadsDir, { recursive: true });
                }

                const textFilePath = path.join(uploadsDir, file.originalname);
                fs.writeFileSync(textFilePath, file.buffer);

                newFile.filename = file.originalname;
                newFile.fileType = file.mimetype;
                newFile.fileSize = file.size;
                newFile.url = textFilePath;
            }

            savedFiles.push(await this.filesRepository.save(newFile));
        }

        return savedFiles;
    }
}
