import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../users/user.module";
import { JwtStrategy } from "./strategies/auth.strategy";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1h" },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
