import {Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login() {
        return this.authService.generateToken();
    }
}
