import { Injectable, ConflictException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../entities/user.entity";

@Injectable()
export class UserService {
  private readonly saltRounds = 10;

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async registerUser(
    username: string,
    password: string,
    fullname: string,
  ): Promise<User> {
    const existingUser = await this.userRepository.findByUsername(username);

    if (existingUser) {
      throw new ConflictException("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
    return this.userRepository.createUser(username, hashedPassword, fullname);
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
  }
}
