import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { ItemRepository } from "./item.repository";
import { CreateNewItemDto } from "./item.dto";

@Injectable()
export class ItemService {
    constructor(private readonly itemRepo: ItemRepository) { }

    async createNewItem(dto: CreateNewItemDto) {
        const existingItem = await this.itemRepo.findByName({ userId: dto.userId, name: dto.name })
        if (existingItem) {
            throw new ConflictException("Item already exist")
        }

        const createdItem = await this.itemRepo.createItem(dto)
        return { message: "Item created successfull", statusCode: HttpStatus.CREATED, data: createdItem }
    }
}