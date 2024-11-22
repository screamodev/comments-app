import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCommentDto {
  @ApiProperty({
    example: "aBcD12",
  })
  @IsNotEmpty()
  captcha: string;

  @ApiProperty({
    example: "This is a sample comment text",
  })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiPropertyOptional({
    example: 1,
  })
  @IsOptional()
  parentId?: number;

  jobIds: string[];
}
