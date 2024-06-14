import { Like } from "./entities/like.entity";
import { Injectable } from "@nestjs/common";
import { CreateLikeDto } from "./dto/create-like.dto";
import { UpdateLikeDto } from "./dto/update-like.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async toggleLike(userId: number, postId: number) {
    const existingLike = await this.prisma.likes.findUnique({
      where: {
        userId_postId: {
          postId,
          userId,
        },
      },
    });

    if (existingLike) {
      //unlike
      await this.prisma.likes.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
    } else {
      //like
      await this.prisma.likes.create({
        data: {
          userId,
          postId, 
        },
      }); 
    }
  }

  async hasUserLikedPost(userId: number, postId: number): Promise<boolean> {
    const like = await this.prisma.likes.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    return Boolean(like);
  }

  async getLikeCount(userId:number, postId:number){
    console.log(postId)
    const likesCount = await this.prisma.likes.count({
      where: {
        
        postId
      },
    }); 
    return {likesCount}
  } 
}

// async likePost(userId: number, postId:number):Promise<void>{
//   await this.prisma.likes.create({
//     data:{
//       userId,
//       postId
//     }
//   })
// }

// async unlikePost (userId:number, postId:number): Promise<void>{
//   await this.prisma.likes.delete({
//     where: {
//       userId_postId: {
//         userId,
//         postId
//       }
//     }
//   })
// }

// async getPostLikes(postId:number): Promise<number>{
//   const likesCount = await this.prisma.likes.count({
//     where:{
//       postId
//     }
//   })
//   return likesCount
// }
