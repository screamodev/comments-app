import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import {CommentsService} from "../services/comments.service";
import {CreateCommentDto} from "../dtos/create-comment.dto";

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @Get()
  async findAll(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 25,
      @Query('sort') sort: 'asc' | 'desc' = 'desc'
  ) {
    return this.commentService.getComments(page, limit, sort);
  }
}
