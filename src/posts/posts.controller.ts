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
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { GetCurrentUserId } from "src/auth/decorator";
import { AtGuard } from "src/auth/guard";
import { Prisma } from "@prisma/client";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("api/posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.getPosts();
  }

  @UseGuards(AtGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "public/files",
        filename: (req, file, callback) => {
          
          console.log(file)
          const filename: string = file.originalname
					const extension: string = filename.split('.')[1]
          console.log("generated filename:", filename);
          callback(null, `${Date.now()}.${extension}`);
        },
      }),
    })
  )
  async createPost(
    @UploadedFile() file: Express.Multer.File,
    @GetCurrentUserId() userId: number,
    // @Body() dto: Prisma.PostsCreateInput
  ) {
    // console.log(JSON.stringify(file))
    console.log(file)
    const imageUrl = `http://localhost:5000/files/${file.filename}`;
    return this.postsService.createPost(userId,  imageUrl);
  }

  @Get(":id")
  async getPostById(@Param("id") id: number) {
    return this.postsService.getPostById(id);
  }

  @UseGuards(AtGuard)
  @Put(":id")
  async  updatePost(
    @GetCurrentUserId() userId: number,
    @Param("id") id: number,
    @Body() dto: Prisma.PostsUpdateInput
  ) {
    return this.postsService.updatePost(id, userId, dto);
  }

  @UseGuards(AtGuard)
  @Post(":id")
  @HttpCode(HttpStatus.OK)
  async deletePost(@GetCurrentUserId() userId: number, @Param("id") id: number) {
    return this.postsService.deletePost(userId, id);
  }
}
 