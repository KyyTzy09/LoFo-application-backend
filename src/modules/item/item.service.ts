import { ConflictException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ItemRepository } from "./item.repository";
import { CreateNewItemDto } from "./item.dto";
import { Qrservice } from "../qr/qr.service";

@Injectable()
export class ItemService {
    constructor(private readonly itemRepo: ItemRepository, private readonly qrService: Qrservice) { }

    async createNewItem(dto: CreateNewItemDto) {
        const existingItem = await this.itemRepo.findByName({ userId: dto.userId, name: dto.name })
        if (existingItem) {
            throw new ConflictException("Item already exist")
        }

        const createdItem = await this.itemRepo.createItem(dto)
        const generateQr = await this.qrService.generateQR({ itemId: createdItem.itemId })
        if (!generateQr) {
            throw new HttpException("Generate QR error", HttpStatus.INTERNAL_SERVER_ERROR)
        }

        const uploadedQr = await this.qrService.uploadQr({ qrImage: generateQr })

        return { message: "Item created successfull", statusCode: HttpStatus.CREATED, data: createdItem, qr: uploadedQr.data }
    }
}