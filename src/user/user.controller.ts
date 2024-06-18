import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { GetCurrentUserId, Public } from "src/auth/decorator";
import { Prisma } from "@prisma/client";


@Controller('api/users')
export class UserController{
    constructor (private  userService: UserService){}

    @Public()
    @Get()
    async getUsers(){
        return this.userService.getUsers()
    }

    @Get('author')
    async getAuthor(@GetCurrentUserId() authorId:number){
        return this.userService.getAuthor(authorId)
    }

    @Public()
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) userId:number ){
        return this.userService.getUserById(userId)
    } 
 
    @Put('update')
    updateUser(@GetCurrentUserId() userId:number, @Body() dto:Prisma.UsersUpdateInput){
        console.log('user info controller', userId, dto.username)
        return this.userService.updateUser(userId, dto) 
    }
 
    @Delete('delete')
    deleteProfile(@GetCurrentUserId() authorId: number){
        return this.userService.deleteProfile(authorId)
    }
  
   
}   