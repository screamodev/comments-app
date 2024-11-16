import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async generateToken(): Promise<{ accessToken: string }> {
        const payload = { isAuthorized: true };
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
}
