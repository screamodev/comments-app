import { IsNotEmpty, IsEmail, IsOptional, IsUrl, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {Type} from "class-transformer";

export class CreateCommentDto {
    @ApiProperty({
        example: 'JohnDoe'
    })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({
        example: 'johndoe@example.com'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiPropertyOptional({
        example: 'https://example.com'
    })
    @IsOptional()
    @IsUrl()
    homePage?: string;

    @ApiProperty({
        example: 'aBcD12'
    })
    @IsNotEmpty()
    captcha: string;

    @ApiProperty({
        example: 'This is a sample comment text'
    })
    @IsNotEmpty()
    @IsString()
    text: string;

    @ApiPropertyOptional({
        example: 1
    })
    @IsOptional()
    parentId?: number;

    @ApiProperty({
        type: 'array',
        items: {
            type: 'string',
            format: 'binary',
        },
    })
    @Type(() => Object)
    files: Express.Multer.File[];

    jobIds: string
}
