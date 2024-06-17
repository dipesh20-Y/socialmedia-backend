import { Prisma, Users } from '@prisma/client';
import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from 'src/prisma/prisma.service';
import { FORBIDDEN_MESSAGE } from '@nestjs/core/guards';


@Injectable()
export class UserService{
    constructor(private prisma: PrismaService ){}

    async getUsers(): Promise<Users[]>{
        return this.prisma.users.findMany(
            // {
            //     include:{
            //         posts:true
            //     }
            // }
        )
    }

    async getUserById(id:number):Promise<Users>{
        return this.prisma.users.findUnique({
            where:{id:id} 
        })
    }

    async updateUser(userId:number, dto:Prisma.UsersUpdateInput){

        console.log('update user info', dto)
        const user = await this.prisma.users.findUnique({ 
            where:{id:userId}
        })

        if (!user) {
            throw new ForbiddenException("No such user exists")
        } else if(user.id != userId){
            throw new ForbiddenException('No access')
        }
        return this.prisma.users.update({
            where:{id:userId},
            data:{...dto}
        }) 
    }

    async deleteProfile(authorId:number){ 
        const user = await this.prisma.users.findUnique({
            where:{id:authorId}
        })

        if (!user || user.id != authorId) {
            throw new ForbiddenException("Not authorized to delete")
        }
        return this.prisma.users.delete({
            where:{id:authorId}
        })
    }

    async getAuthor(authorId:number){
        // console.log(authorId)
       return this.prisma.users.findUnique({
        where:{id:authorId},
        include:{
            posts:true 
        }
       })
    }


}