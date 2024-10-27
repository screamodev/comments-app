import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
      @InjectRepository(Comment)
      private commentRepository: Repository<Comment>,

      @InjectRepository(User)
      private userRepository: Repository<User>,
  ) {}

  async createComment(dto: CreateCommentDto): Promise<Comment> {
    const user = await this.userRepository.findOneBy({ email: dto.email });

    const comment = this.commentRepository.create({
      text: dto.text,
      user: user,
      parent: dto.parentId ? await this.commentRepository.findOneBy({ id: dto.parentId }) : null,
      allowedTags: ['a', 'code', 'i', 'strong'],
    });

    return this.commentRepository.save(comment);
  }

  async getComments(page: number, limit: number, sort: 'asc' | 'desc') {
    return this.commentRepository.find({
      relations: ['user', 'parent', 'replies'],
      order: { createdAt: sort === 'asc' ? 'ASC' : 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
    });
  }
}
