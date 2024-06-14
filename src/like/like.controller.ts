import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { GetCurrentUserId } from 'src/auth/decorator';

@Controller('api/likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(':postId/like')
  async likePost(@GetCurrentUserId() userId: number, @Param('postId', ParseIntPipe) postId:number){
     return this.likeService.toggleLike(userId, postId)
  }

  @Get('state/:postId')
  async hasUserLikedPost(@GetCurrentUserId() userId: number, @Param('postId', ParseIntPipe) postId:number){
    return this.likeService.hasUserLikedPost(userId,postId)
  } 

  @Get('count/:postId')
  async getLikeCount(@GetCurrentUserId() userId:number ,@Param('postId', ParseIntPipe) postId:number){ 
    return this.likeService.getLikeCount(userId, postId)
  }
}   
     
 

// @Post(':postId')
//   async likePost(@GetCurrentUserId() userId:number, @Param('postId', ParseIntPipe) postId: number){
//     return this.likeService.likePost(userId, postId)
//   }

//   @Delete('delete/:postId')
//   async unlikePost(@GetCurrentUserId() userId: number, @Param('postId', ParseIntPipe) postId:number){
//     return this.likeService.unlikePost(userId, postId)
//   }

//   @Get(':postId')
//   async getPostLikes(@Param('postId',ParseIntPipe) postId:number){
//     return this.likeService.getPostLikes(postId)
//   } 