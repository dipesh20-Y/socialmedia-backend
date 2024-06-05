import { ForbiddenException, Injectable } from '@nestjs/common';
// import { CreateCommentDto } from './dto/create-comment.dto';
// import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class CommentsService {

  constructor(private prisma: PrismaService){}

  async createComment(userId:number, dto:Prisma.CommentsCreateInput, postId:number ) {
    return this.prisma.comments.create({
      data:{
        content:dto.content,
        user:{
          connect:{id:userId}
        },
        post:{
          connect:{id:postId}
        }
      }
    })
  }

  async getComments(){
    return this.prisma.comments.findMany({
      include:{
        user:true,
        post:true
      }
    })
  }



  async updateComment(userId:number, commentId: number, dto:Prisma.CommentsUpdateInput) {
    const comment = await this.prisma.comments.findUnique({
      where:{id:commentId}
    })

    if (!comment || comment.userId != userId) {
      throw new ForbiddenException("You are not allowed to edit this comment")
    }
    return this.prisma.comments.update({
      where:{id:commentId},
      data:{...dto}
    })
  }

  async deleteComment( userId:number,commentId: number) {
    const comment = await this.prisma.comments.findUnique({
      where:{id:commentId}
    })

    if (!comment || comment.userId != userId) {
      throw new ForbiddenException("You are not allowed to delete this comment")
    }
    return this.prisma.comments.delete({
      where:{id:commentId}
    })
  }
}
