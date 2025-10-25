import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ItemService } from "./item.service";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { storage } from "src/shared/configs/multer.config";
import { CreateNewItemDto, UpdateItemStatusDto } from "./item.dto";
import { ApiBearerAuth, ApiConsumes, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateItemResponseDto, DeleteItemResponseDto, GetAllItemsResponseDto, GetItemByIdResponseDto, GetuserItemsResponseDto, UpdateItemStatusResponseDto } from "./item.response.dto";

@ApiTags("Item-path")
@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) { }

    @ApiResponse({ type: GetAllItemsResponseDto })
    @Get("get")
    getAllItems() {
        return this.itemService.getAllItems()
    }

    @ApiResponse({ type: GetuserItemsResponseDto })
    @ApiBearerAuth()
    @Get("user/get")
    @UseGuards(AuthGuard)
    getUserItems(@Req() req) {
        return this.itemService.getUserItems({ userId: req.user.userId })
    }

    @ApiResponse({ type: GetItemByIdResponseDto })
    @Get(":itemId/get")
    getItemById(@Param("itemId") itemId: string) {
        return this.itemService.getItemById({ itemId })
    }

    @ApiResponse({ status: HttpStatus.CREATED, type: CreateItemResponseDto })
    @Post("create")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor("file", { storage }))
    @ApiConsumes('multipart/form-data')
    createNewItem(@Req() req, @UploadedFile() file: Express.Multer.File, @Body() dto: CreateNewItemDto) {
        return this.itemService.createNewItem({ userId: req.user.userId, image: file.path, name: dto.name, info: dto.info })
    }

    @ApiResponse({ type: UpdateItemStatusResponseDto })
    @Patch("update-status")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    updateItemStatus(@Req() req, @Body() dto: UpdateItemStatusDto) {
        return this.itemService.updateItemStatus({ userId: req.user.userId, itemId: dto.itemId, status: dto.status })
    }

    @ApiResponse({ type: DeleteItemResponseDto })
    @Delete(":itemId/delete")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    deleteItemById(@Req() req, @Param("itemId") itemId: string,) {
        return this.itemService.deleteItemById({ userId: req.user.userId, itemId })
    }
}