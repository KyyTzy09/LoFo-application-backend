import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Item, ItemStatus } from "@prisma/client";

@Injectable()
export class ItemRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return await this.prisma.item.findMany({
            include: {
                user: {
                    select: {
                        userId: true,
                        phoneNumber: true,
                        profile: true
                    }
                }
            },
            orderBy: {
                itemName: "asc"
            }
        })
    }

    async findByUserId(data: { userId: string }): Promise<Item[]> {
        return await this.prisma.item.findMany({
            where: {
                userId: data.userId
            },
            orderBy: {
                itemName: "asc"
            }
        })
    }

    async findById(data: { itemId: string }) {
        return await this.prisma.item.findUnique({
            where: {
                itemId: data.itemId
            },
            include: {
                user: {
                    select: {
                        userId: true,
                        phoneNumber: true,
                        profile: true
                    }
                }
            }
        })
    }

    async findByUnique(data: { userId: string, itemId: string }): Promise<Item | null> {
        return await this.prisma.item.findUnique({
            where: {
                itemId: data.itemId,
                userId: data.userId
            }
        })
    }

    async findByName(data: { name: string, userId: string }): Promise<Item | null> {
        return await this.prisma.item.findFirst({
            where: {
                userId: data.userId,
                itemName: data.name
            }
        })
    }

    async createItem(data: { userId: string, name: string, info: string, image: string }): Promise<Item> {
        return await this.prisma.item.create({
            data: {
                itemName: data.name,
                itemInfo: data.info,
                image: data.image,
                userId: data.userId
            }
        })
    }

    async updateStatus(data: { itemId: string, status: ItemStatus }): Promise<Item> {
        return await this.prisma.item.update({
            where: {
                itemId: data.itemId
            },
            data: {
                status: data.status
            }
        })
    }

    async updateQr(data: { itemId: string, qrUrl: string }): Promise<Item> {
        return await this.prisma.item.update({
            where: {
                itemId: data.itemId
            },
            data: {
                qrUrl: data.qrUrl
            }
        })
    }

    async deleteById(data: { itemId: string, userId: string }): Promise<Item> {
        return await this.prisma.item.delete({
            where: {
                itemId: data.itemId,
                userId: data.userId
            }
        })
    }
}