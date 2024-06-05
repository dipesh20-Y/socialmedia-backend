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
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
// import { CreateCommentDto } from "./dto/create-comment.dto";
// import { UpdateCommentDto } from "./dto/update-comment.dto";
import { GetCurrentUserId } from "src/auth/decorator";
import { AtGuard } from "src/auth/guard";
import { Prisma } from "@prisma/client";

@Controller("api/comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@GetCurrentUserId() userId:number, postId:number ,@Body() dto: Prisma.CommentsCreateInput) {
    return this.commentsService.createComment(userId, dto, postId);
  }

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
  async updateComment(@GetCurrentUserId() userId:number, @Param("id") commentId: number, @Body() dto: Prisma.CommentsUpdateInput){
    return this.commentsService.updateComment(userId, commentId, dto)
  }

  @UseGuards(AtGuard)
  @Delete(":id")
  async deleteComment(@GetCurrentUserId() userId:number,  @Param("id") commentId: number ){
    return this.commentsService.deleteComment(userId, commentId)
  }
}
