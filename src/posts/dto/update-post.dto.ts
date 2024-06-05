import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsNotEmpty()
    @IsString()
    content?:string

    @IsOptional()
    @IsString()
    imageUrl?:string
}
