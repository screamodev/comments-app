import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  UploadedFiles,
  UseInterceptors,
  BadRequestException, UseGuards
} from '@nestjs/common';
import {CommentsService} from "../services/comments.service";
import {CreateCommentDto} from "../dtos/create-comment.dto";
import {FilesInterceptor} from "@nestjs/platform-express";
import {FileService} from "../../files/services/file.service";
import {ApiBearerAuth, ApiConsumes} from "@nestjs/swagger";
import {CommentsGateway} from "../gateways/comments.gateway";
import {AuthGuard} from "../../auth/guards/auth.guard";

@Controller('comments')
export class CommentsController {
  constructor(
      private readonly commentsService: CommentsService,
      private readonly fileService: FileService,
      private readonly commentsGateway: CommentsGateway
  ) {}

  @Get()
  async findAll(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 25,
      @Query('field') field: string = 'createdAt',
      @Query('order') order: 'ASC' | 'DESC' = 'DESC'
  ) {
    return this.commentsService.getComments(page, limit, field, order);
  }

  @Get(':id/replies')
  async findReplies(@Param('id') id: number) {
    return this.commentsService.getReplies(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('pre-upload')
  @UseInterceptors(FilesInterceptor('files'))
  async preUpload(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    const jobIds = await this.fileService.preUploadFiles(files);
    return { jobIds };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files')) // TODO: Delete file from here
  async create(
      @Body() createCommentDto: CreateCommentDto
  ) {

    const comment = await this.commentsService.createComment(createCommentDto);

    if (createCommentDto.jobIds && createCommentDto.jobIds.length > 0) {
      comment.files = await this.fileService.attachFilesToComment(comment.id, JSON.parse(createCommentDto.jobIds));
    }

    if (!comment?.parent?.id) {
      this.commentsGateway.emitNewComment(comment);
    } else {
      this.commentsGateway.emitNewReply(comment);
    }

    return { success: true, comment };
  }
}
