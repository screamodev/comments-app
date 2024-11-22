import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "../services/auth.service";
import { RegisterDto } from "../dtos/register.dto";
import { AuthResponse } from "../types/responses/auth-response";
import { UserService } from "../../users/services/user.service";
import { LoginDto } from "../dtos/login.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post("register")
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
    const user = await this.userService.registerUser(registerDto);

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      homePage: user.homePage,
    };
    const token = this.authService.generateJwt(payload);

    return { user: payload, token };
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    const { username, password } = loginDto;

    const user = await this.userService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      homePage: user.homePage,
    };
    const token = this.authService.generateJwt(payload);

    return { user: payload, token };
  }
}
