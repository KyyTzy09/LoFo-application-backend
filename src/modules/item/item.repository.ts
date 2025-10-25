import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ItemStatus } from "@prisma/client";

@Injectable()
export class ItemRepository {
    constructor(private readonly prisma: PrismaService) { }
    async findById(data: { itemId: string }) {
        return await this.prisma.item.findUnique({
            where: {
                itemId: data.itemId
            },
            include: {
                user: true
            }
        })
    }

    async findByUnique(data: { userId: string, itemId: string }) {
        return await this.prisma.item.findUnique({
            where: {
                itemId: data.itemId,
                userId: data.userId
            }
        })
    }

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

    async updateStatus(data: { itemId: string, status: ItemStatus }) {
        return await this.prisma.item.update({
            where: {
                itemId: data.itemId
            },
            data: {
                status: data.status
            }
        })
    }

    async updateQr(data: { itemId: string, qrUrl: string }) {
        return await this.prisma.item.update({
            where: {
                itemId: data.itemId
            },
            data: {
                qrUrl: data.qrUrl
            }
        })
    }
}