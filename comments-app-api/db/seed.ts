import AppDataSource from "./data-source";
import { User } from "../src/users/entities/user.entity";
import { Comment } from "../src/comments/entities/comment.entity";

async function seed() {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);
  const commentRepository = AppDataSource.getRepository(Comment);

  const user1 = userRepository.create({
    username: 'User4',
    email: 'user4@example.com',
    homePage: 'https://example4.com',
  });
  const user2 = userRepository.create({
    username: 'User3',
    email: 'user3@example.com',
    homePage: 'https://example3.com',
  });
  await userRepository.save([user1, user2]);

  const parentComment = commentRepository.create({
    text: 'First Comment',
    user: user1,
  });
  await commentRepository.save(parentComment);

  const childComment1 = commentRepository.create({
    text: 'Answer to the feirst',
    user: user2,
    parent: parentComment,
  });
  const childComment2 = commentRepository.create({
    text: 'Second answer',
    user: user1,
    parent: parentComment,
  });
  await commentRepository.save([childComment1, childComment2]);
}

seed()
  .then(() => console.log("Seeding complete!"))
  .catch((err) => console.error("Seeding error:", err));
