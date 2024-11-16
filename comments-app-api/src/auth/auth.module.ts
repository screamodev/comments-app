import { Module } from '@nestjs/common';
import {JwtModule, JwtService} from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import {AuthController} from "./controllers/auth.controller";
import {jwtConstants} from "./constants/constants";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
