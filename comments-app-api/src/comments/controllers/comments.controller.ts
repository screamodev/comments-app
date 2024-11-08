import {Controller, Post, Body, Get, Query, Param, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {CommentsService} from "../services/comments.service";
import {CreateCommentDto} from "../dtos/create-comment.dto";
import {FilesInterceptor} from "@nestjs/platform-express";
import {FileService} from "../../files/services/file.service";
import {ApiConsumes} from "@nestjs/swagger";
import {CommentsGateway} from "../gateways/comments.gateway";

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

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  async create(
      @Body() createCommentDto: CreateCommentDto,
      @UploadedFiles() files: Express.Multer.File[],
  ) {
    const comment = await this.commentsService.createComment(createCommentDto);

    if (files && files.length > 0) {
      comment.files = await this.fileService.uploadFiles(comment.id, files);
    }

    if (!comment?.parent?.id) {
      this.commentsGateway.emitNewComment(comment);
    } else {
      this.commentsGateway.emitNewReply(comment);
    }

    return { success: true };
  }
}
