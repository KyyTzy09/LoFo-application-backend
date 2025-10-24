import { Body, Controller, HttpCode, HttpStatus, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ItemService } from "./item.service";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { storage } from "src/shared/configs/multer.config";
import { CreateNewItemDto } from "./item.dto";

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) { }

    @Post("create")
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor("file", { storage }))
    createNewItem(@Req() req, @UploadedFile() file: Express.Multer.File,@Body() dto: CreateNewItemDto) {
        return this.itemService.createNewItem({ userId: req.user.userId, image: file.path, name: dto.name, info: dto.info })
    }
}