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
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: diskStorage({
  //       destination: (req, file, callback) => {
  //         console.log('Setting destination for file storage');
  //         callback(null, 'public/files');
  //       },
  //       filename: (req, file, callback) => {
  //         console.log('In filename callback');
  //         // Check if file is present
  //         if (!file) {
  //           console.log('No file uploaded');
  //           return callback(new Error('No file uploaded'), null);
  //         }

  //         // Log file details and request body
  //         console.log('File:', file);
  //         console.log('Request body:', req.body);

  //         const filename: string = file.originalname;
  //         const extension: string = filename.split('.').pop();
  //         const generatedFilename = `${Date.now()}.${extension}`;
  //         console.log('Generated filename:', generatedFilename);

  //         callback(null, generatedFilename);
  //       },
  //     }),
  //   }),
  // )
  async createPost(
    // @UploadedFile() file: Express.Multer.File,
    @GetCurrentUserId() userId: number,
    @Body() dto: Prisma.PostsCreateInput
  ) {
    // console.log(JSON.stringify(file))
    // console.log('abcd')
    // const imageUrl = `http://localhost:5000/files/${file.filename}`;
    return this.postsService.createPost(userId, dto);
  }

  @Public() 
  @Get(":id")
  async getPostById(@Param('id', ParseIntPipe) id: number) {
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
 