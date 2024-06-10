import { Post } from "@nestjs/common";
import { Injectable, ForbiddenException } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Posts, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async getPosts(): Promise<Posts[]> {
    return this.prisma.posts.findMany({
      include: {
        user: true,
      },
    });
  }

  async createPost(
    userId: number,
    dto: Prisma.PostsCreateInput
  ): Promise<Posts> {
    console.log(dto);
    return this.prisma.posts.create({
      data: {
        content: dto.content,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async getPostById(postId: number): Promise<Posts> { 
    return this.prisma.posts.findUnique({
      where: { id: postId },
      include: {  
        user: true,
      },
    });
  }

  async updatePost(
    postId: number,
    userId: number,
    dto: Prisma.PostsUpdateInput
  ): Promise<Posts> {

    console.log(postId)
    console.log(dto)
    const post = await this.prisma.posts.findUnique({
      where: { id: postId },
    });



    if (!post || post.userId != userId) {
      throw new ForbiddenException("Access denied!!");
    }
    return this.prisma.posts.update({
      where: { id: postId },
      data: { ...dto },
    });
  }

 
  async deletePost(userId: number, postId: number) {

    const post = await this.prisma.posts.findUnique({
      where: { id: postId },
    });


    if (!post || post.userId !== userId) {
      throw new ForbiddenException('Access denied!');
    }

    return this.prisma.posts.delete({
      where: { id: postId },
    });
  }
}
