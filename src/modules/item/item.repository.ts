import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ItemRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findByName(data: { name: string, userId: string }) {
        return await this.prisma.item.findFirst({
            where: {
                userId: data.userId,
                itemName: data.name
            }
        })
    }

    async createItem(data: { userId: string, name: string, info: string, image: string }) {
        return await this.prisma.item.create({
            data: {
                itemName: data.name,
                itemInfo: data.info,
                image: data.image,
                userId: data.userId
            }
        })
    }

    async updateQr(){
    }
}