import { Module } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./repositories/user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
