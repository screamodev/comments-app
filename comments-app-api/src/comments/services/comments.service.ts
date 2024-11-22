import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import * as sanitizeHtml from "sanitize-html";
import { Repository } from "typeorm";
import { Comment } from "../entities/comment.entity";
import { CommentDto } from "../dtos/comment.dto";
import { User } from "../../users/entities/user.entity";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createComment(dto: CommentDto): Promise<Comment> {
    const sanitizedText = sanitizeHtml(dto.text, {
      allowedTags: ["a", "code", "i", "strong", "p"],
      allowedAttributes: { a: ["href", "title"] },
    });

    const user = await this.userRepository.findOneBy({ id: dto.userId });

    const comment = this.commentRepository.create({
      text: sanitizedText,
      user: user,
      parent: dto.parentId
        ? await this.commentRepository.findOneBy({ id: dto.parentId })
        : null,
    });

    await this.cacheManager.reset();

    return await this.commentRepository.save(comment);
  }

  async getComments(
    page: number,
    limit: number,
    field: string,
    order: "ASC" | "DESC",
  ) {
    const cacheKey = `comments_${page}_${limit}_${field}_${order}`;
    const cachedComments = await this.cacheManager.get<Comment[]>(cacheKey);

    if (cachedComments) {
      return cachedComments;
    }

    const comments = await this.commentRepository
      .createQueryBuilder("comment")
      .leftJoinAndSelect("comment.user", "user")
      .leftJoinAndSelect("comment.parent", "parent")
      .leftJoinAndSelect("comment.files", "files")
      .leftJoinAndSelect("comment.replies", "replies")
      .where("comment.parent IS NULL")
      .orderBy(`comment.${field}`, order)
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    await this.cacheManager.set(cacheKey, comments, 0);

    return comments;
  }

  async getReplies(commentId: number) {
    return this.commentRepository.find({
      where: { parent: { id: commentId } },
      relations: ["files", "user", "parent", "replies"],
      order: { createdAt: "ASC" },
    });
  }
}
