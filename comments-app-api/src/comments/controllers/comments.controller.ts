import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Request,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  UseGuards,
} from "@nestjs/common";
import { CommentsService } from "../services/comments.service";
import { CreateCommentDto } from "../dtos/create-comment.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { FileService } from "../../files/services/file.service";
import { ApiBearerAuth, ApiConsumes } from "@nestjs/swagger";
import { CommentsGateway } from "../gateways/comments.gateway";
import { AuthGuard } from "@nestjs/passport";
import { CommentDto } from "../dtos/comment.dto";

@Controller("comments")
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly fileService: FileService,
    private readonly commentsGateway: CommentsGateway,
  ) {}

  @Get()
  async findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 25,
    @Query("field") field: string = "createdAt",
    @Query("order") order: "ASC" | "DESC" = "DESC",
  ) {
    return this.commentsService.getComments(page, limit, field, order);
  }

  @Get(":id/replies")
  async findReplies(@Param("id") id: number) {
    return this.commentsService.getReplies(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post("pre-upload")
  @UseInterceptors(FilesInterceptor("files"))
  @ApiConsumes("multipart/form-data")
  async preUpload(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException("No files uploaded");
    }

    const jobIds = await this.fileService.preUploadFiles(files);
    return { jobIds };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post()
  async create(
    @Request() req: any,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const userId = req.user.id;

    const comment = await this.commentsService.createComment({
      ...createCommentDto,
      userId,
    });

    if (createCommentDto.jobIds && createCommentDto.jobIds.length > 0) {
      comment.files = await this.fileService.attachFilesToComment(
        comment.id,
        createCommentDto.jobIds,
      );
    }

    if (!comment?.parent?.id) {
      this.commentsGateway.emitNewComment(comment);
    } else {
      this.commentsGateway.emitNewReply(comment);
    }

    return { success: true, comment };
  }
}
