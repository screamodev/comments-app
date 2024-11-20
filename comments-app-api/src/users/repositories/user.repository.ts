import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository extends Repository<User> {
  async findByUsername(username: string): Promise<User | undefined> {
    return this.findOne({
      where: { username },
      select: ["id", "username", "password", "fullname"],
    });
  }

  async createUser(
    username: string,
    password: string,
    fullname: string,
  ): Promise<User> {
    const user = this.create({ username, password, fullname });
    return this.save(user);
  }
}
