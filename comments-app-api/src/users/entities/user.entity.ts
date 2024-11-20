import { Comment } from "../../comments/entities/comment.entity";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@Entity()
@Unique(["username"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  username: string;

  @Column({ select: false })
  password?: string;

  @Column({ length: 150 })
  fullname: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments?: Comment[];
}
