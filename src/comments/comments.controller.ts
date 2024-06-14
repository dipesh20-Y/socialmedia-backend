import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
// import { CreateCommentDto } from "./dto/create-comment.dto";
// import { UpdateCommentDto } from "./dto/update-comment.dto";
import { GetCurrentUserId, Public } from "src/auth/decorator";
import { AtGuard } from "src/auth/guard";
import { Prisma } from "@prisma/client";
import { AuthGuard } from "@nestjs/passport";

@Controller("api/comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @UseGuards(AtGuard)
  @Post('upload')
  create(@GetCurrentUserId() userId:number,  @Body() dto: Prisma.CommentsUncheckedCreateInput) {
    // console.log(dto.postId)
    return this.commentsService.createComment(userId, dto);
  }

  @Public() 
  @Get()
  getComments() { 
    return this.commentsService.getComments();
  }

//   @Get(":id")
//  async getCommentById(@GetCurrentUserId() userId:number, @Param("id") postId: number){
//     return this.commentsService.getCommentById(userId, postId)
//  }
 @UseGuards(AtGuard)
  @Put(":id")
  async updateComment(@GetCurrentUserId() userId:number, @Param("id", ParseIntPipe) commentId: number, @Body() dto: Prisma.CommentsUpdateInput){
    return this.commentsService.updateComment(userId, commentId, dto)
  }

  @UseGuards(AtGuard)
  @Delete("delete/:id")
  async deleteComment(@GetCurrentUserId() userId:number,  @Param("id", ParseIntPipe) commentId: number ){ 
    return this.commentsService.deleteComment(userId, commentId)
  }
} 
