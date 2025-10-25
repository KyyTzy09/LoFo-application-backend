import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ItemService } from "./item.service";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { storage } from "src/shared/configs/multer.config";
import { CreateNewItemDto, UpdateItemStatusDto } from "./item.dto";

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) { }

    @Get("get")
    getAllItems() {
        return this.itemService.getAllItems()
    }

    @Get("user/get")
    @UseGuards(AuthGuard)
    getUserItems(@Req() req) {
        return this.itemService.getUserItems({ userId: req.user.userId })
    }

    @Get(":itemId/get")
    getItemById(@Param("itemId") itemId: string) {
        return this.itemService.getItemById({ itemId })
    }

    @Post("create")
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor("file", { storage }))
    createNewItem(@Req() req, @UploadedFile() file: Express.Multer.File, @Body() dto: CreateNewItemDto) {
        return this.itemService.createNewItem({ userId: req.user.userId, image: file.path, name: dto.name, info: dto.info })
    }

    @Patch("update-status")
    @UseGuards(AuthGuard)
    updateItemStatus(@Req() req, @Body() dto: UpdateItemStatusDto) {
        return this.itemService.updateItemStatus({ userId: req.user.userId, itemId: dto.itemId, status: dto.status })
    }

    @Delete(":itemId/delete")
    @UseGuards(AuthGuard)
    deleteItemById(@Req() req, @Param("itemId") itemId: string,) {
        return this.itemService.deleteItemById({ userId: req.user.userId, itemId })
    }
}