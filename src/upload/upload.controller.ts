import {
    Controller,
    Post,
    Req,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { Request } from 'express'
import { Public } from 'src/auth/decorator'


@Public()
@Controller('api/upload')
export class UploadController {
    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: 'public/files',
                filename: (req, file, cb) => {
                    const filename: string = file.originalname
                    const extension: string = filename.split('.')[1]
                    cb(null, `${Date.now()}.${extension}`)
                },
            }),
        }),
    )
    async uploadFile(
        @Req() req: Request,
        @UploadedFile() file: Express.Multer.File,
    ) {
        // get public address of file from request
        const fullPublicUrl = `${req.protocol}://${req.get('host')}/public/files/${file.filename
            }`
        return fullPublicUrl
    }
} 