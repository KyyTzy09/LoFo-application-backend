import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async getByUserId(data: { userId: string }): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                userId: data.userId
            },
            include: {
                profile: true
            }
        })
    }

    async getByPhoneNumber(data: { phoneNumber: string }): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                phoneNumber: data.phoneNumber
            }
        })
    }

    async createUser(data: { phoneNumber: string, password: string }): Promise<User> {
        return await this.prisma.user.create({
            data
        })
    }
}