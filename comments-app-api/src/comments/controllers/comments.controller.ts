import {Controller, Post, Body, Get, Query, Param, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {CommentsService} from "../services/comments.service";
import {CreateCommentDto} from "../dtos/create-comment.dto";
import {FilesInterceptor} from "@nestjs/platform-express";
import {FileService} from "../../files/services/file.service";
import {ApiConsumes} from "@nestjs/swagger";

@Controller('comments')
export class CommentsController {
  constructor(
      private readonly commentsService: CommentsService,
      private readonly fileService: FileService
  ) {}

  @Get()
  async findAll(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 25,
      @Query('sort') sort: 'asc' | 'desc' = 'desc'
  ) {
    return this.commentsService.getComments(page, limit, sort);
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
      await this.fileService.uploadFiles(comment.id, files);
    }

    return comment;
  }
}
