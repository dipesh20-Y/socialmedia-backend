import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsNotEmpty, IsString, isString } from 'class-validator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    @IsNotEmpty()
    @IsString()
    content?: string;
}
