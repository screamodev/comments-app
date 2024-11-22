export class CommentDto {
  captcha: string;
  text: string;
  userId: number;
  parentId?: number;
  jobIds: string[];
}
