import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { ItemRepository } from "./item.repository";
import { CreateNewItemDto, DeleteItemDto, GetItemByIdDto, UpdateItemStatusDto } from "./item.dto";
import { Qrservice } from "../qr/qr.service";
import { ItemStatus } from "@prisma/client";
import e from "express";

@Injectable()
export class ItemService {
    constructor(private readonly itemRepo: ItemRepository, private readonly qrService: Qrservice) { }
    
    async getItemById(dto: GetItemByIdDto) {
        const existingItem = await this.itemRepo.findById(dto)
        if (!existingItem) {
            throw new NotFoundException("This item doesn't exist")
        }

        return { message: "Item data retrieved successfull", statusCode: HttpStatus.OK, data: existingItem }
    }

    async getAllItems() {
        const existingItems = await this.itemRepo.findAll()
        if (existingItems.length === 0) throw new NotFoundException("Items Not found")

        return { message: "items data retrieved successfull", statusCode: HttpStatus.OK, data: existingItems }
    }

    async createNewItem(dto: CreateNewItemDto) {
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

    async updateItemStatus(dto: UpdateItemStatusDto) {
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

    async deleteItemById(dto: DeleteItemDto) {
        const existingItem = await this.itemRepo.findByUnique(dto)
        if (!existingItem) throw new NotFoundException("Item doesn't exist")

        const deletedItem = await this.itemRepo.deleteById(dto)
        return { message: "Item deleted successfull", statusCode: HttpStatus.OK, data: deletedItem }
    }
}