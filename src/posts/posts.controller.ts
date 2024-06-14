import { CreatePostDto } from "./dto/create-post.dto";
import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Put,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { GetCurrentUserId, Public } from "src/auth/decorator";
import { AtGuard } from "src/auth/guard";
import { Prisma } from "@prisma/client";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Public()
  @Get() 
  getPosts() {
    return this.postsService.getPosts();
  }

  
  @UseGuards(AtGuard)
  @Post('upload')
  async createPost(
    @GetCurrentUserId() userId: number,
    @Body() dto: Prisma.PostsCreateInput
  ) {
    return this.postsService.createPost(userId, dto);
  }

  @Public() 
  @Get(":id")
  async getPostById(@Param('id', ParseIntPipe) id: number) {
    // console.log(typeof id)
    return this.postsService.getPostById(id); 
  }  

  @UseGuards(AtGuard)
  @Put("update/:id")
  async updatePost(
    @GetCurrentUserId() userId: number,
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: Prisma.PostsUpdateInput
  ) {
    console.log(id)
    return this.postsService.updatePost(id, userId, dto);
  }

  @UseGuards(AtGuard)
  @Post("delete/:id")
  @HttpCode(HttpStatus.OK)
  async deletePost(
    @GetCurrentUserId() userId: number,
    @Param("id", ParseIntPipe) id: number
  ) {
    console.log(userId)
    console.log(id)
    return this.postsService.deletePost(userId, id);
  }
}
 