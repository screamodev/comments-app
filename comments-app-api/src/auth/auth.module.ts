import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../users/user.module";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1h" },
    }),
  ],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
