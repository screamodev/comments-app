import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { File } from "../../files/entities/file.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  text: string;

  @ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true })
  parent: Comment;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.parent)
  replies: Comment[];

  @OneToMany(() => File, (file) => file.comment)
  files: File[];

  @CreateDateColumn()
  createdAt: Date;
}
