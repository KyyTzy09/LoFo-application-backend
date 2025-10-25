import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { ItemRepository } from "./item.repository";
import { CreateNewItemDto, DeleteItemDto, GetItemByIdDto, GetUserItemsDto, UpdateItemStatusDto } from "./item.dto";
import { Qrservice } from "../qr/qr.service";
import { Item, ItemStatus } from "@prisma/client";
import { ApiResponseType } from "src/shared/types/response.type";

@Injectable()
export class ItemService {
    constructor(private readonly itemRepo: ItemRepository, private readonly qrService: Qrservice) { }

    async getItemById(dto: GetItemByIdDto): Promise<ApiResponseType<Item>> {
        const existingItem = await this.itemRepo.findById(dto)
        if (!existingItem) {
            throw new NotFoundException("This item doesn't exist")
        }

        return { message: "Item data retrieved successfull", statusCode: HttpStatus.OK, data: existingItem }
    }

    async getUserItems(dto: GetUserItemsDto): Promise<ApiResponseType<Item[]>> {
        const existingItems = await this.itemRepo.findByUserId(dto)
        if (existingItems.length === 0) {
            throw new NotFoundException("Items not found")
        }

        return { message: "User items data retrieved successfull", statusCode: HttpStatus.OK, data: existingItems }
    }

    async getAllItems(): Promise<ApiResponseType<Item[]>> {
        const existingItems = await this.itemRepo.findAll()
        if (existingItems.length === 0) throw new NotFoundException("Items Not found")

        return { message: "items data retrieved successfull", statusCode: HttpStatus.OK, data: existingItems }
    }

    async createNewItem(dto: CreateNewItemDto): Promise<ApiResponseType<Item>> {
        const existingItem = await this.itemRepo.findByName({ userId: dto.userId, name: dto.name })
        if (existingItem) {
            throw new ConflictException("Item already exist")
        }

        let createdItem = await this.itemRepo.createItem(dto)
        const generateQr = await this.qrService.generateQR({ itemId: createdItem.itemId })
        if (!generateQr) {
            throw new HttpException("Generate QR error", HttpStatus.INTERNAL_SERVER_ERROR)
        }

        const uploadedQr = await this.qrService.uploadQr({ qrImage: generateQr })
        if (uploadedQr) {
            createdItem = await this.itemRepo.updateQr({ itemId: createdItem.itemId, qrUrl: uploadedQr.data })
        }

        return { message: "Item created successfull", statusCode: HttpStatus.CREATED, data: createdItem }
    }

    async updateItemStatus(dto: UpdateItemStatusDto): Promise<ApiResponseType<Item>> {
        let status: ItemStatus = "TERSEDIA"
        if (dto.status === "TERSEDIA") {
            status = ItemStatus.TERSEDIA
        } else if (dto.status === "HILANG") {
            status = ItemStatus.HILANG
        }

        const existingItem = await this.itemRepo.findByUnique({ itemId: dto.itemId, userId: dto.userId })
        if (!existingItem) {
            throw new NotFoundException("Item doesn't exist")
        }

        const updatedStatus = await this.itemRepo.updateStatus({ itemId: dto.itemId, status })
        return { message: "Item status updated successfull", statusCode: HttpStatus.OK, data: updatedStatus }
    }

    async deleteItemById(dto: DeleteItemDto): Promise<ApiResponseType<Item>> {
        const existingItem = await this.itemRepo.findByUnique(dto)
        if (!existingItem) throw new NotFoundException("Item doesn't exist")

        const deletedItem = await this.itemRepo.deleteById(dto)
        return { message: "Item deleted successfull", statusCode: HttpStatus.OK, data: deletedItem }
    }
}