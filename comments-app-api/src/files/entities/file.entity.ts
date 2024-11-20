import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Comment } from "../../comments/entities/comment.entity";

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  fileType: string;

  @Column()
  fileSize: number;

  @Column()
  url: string;

  @ManyToOne(() => Comment, (comment) => comment.id)
  comment: Comment;
}
