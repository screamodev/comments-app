import { IsNotEmpty, IsEmail, IsOptional, IsUrl, IsString } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsUrl()
    homePage?: string;

    @IsNotEmpty()
    captcha: string;

    @IsNotEmpty()
    @IsString()
    text: string;

    @IsOptional()
    parentId?: number;
}
