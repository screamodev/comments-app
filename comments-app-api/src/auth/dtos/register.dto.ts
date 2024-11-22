import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsUrl } from "class-validator";

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: "johndoe@example.com",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    example: "https://example.com",
  })
  @IsOptional()
  @IsUrl()
  homePage?: string;
}
