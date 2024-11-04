import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as sanitizeHtml from 'sanitize-html';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from '../dtos/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
      @InjectRepository(Comment)
      private commentRepository: Repository<Comment>,
  ) {}

  async createComment(dto: CreateCommentDto): Promise<Comment> {
    const sanitizedText = sanitizeHtml(dto.text, {
      allowedTags: ['a', 'code', 'i', 'strong', 'p'],
      allowedAttributes: { a: ['href', 'title'] },
    });

    const comment = this.commentRepository.create({
      text: sanitizedText,
      username: dto.username,
      email: dto.email,
      homePage: dto.homePage,
      parent: dto.parentId ? await this.commentRepository.findOneBy({ id: dto.parentId }) : null,
    });

    return await this.commentRepository.save(comment);
  }


  async getComments(page: number, limit: number, field: string, order: 'ASC' | 'DESC') {
    return this.commentRepository
        .createQueryBuilder('comment')
        .leftJoinAndSelect('comment.files', 'files')
        .leftJoinAndSelect('comment.parent', 'parent')
        .leftJoinAndSelect('comment.replies', 'replies')
        .where('comment.parent IS NULL')
        .orderBy(`comment.${field}`, order)
        .skip((page - 1) * limit)
        .take(limit)
        .getMany();
  }

  async getReplies(commentId: number) {
    return this.commentRepository.find({
      where: { parent: { id: commentId } },
      relations: ['files', 'parent', 'replies'],
      order: { createdAt: 'ASC' },
    });
  }
}
