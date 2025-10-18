import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async getByPhoneNumber(data: { phoneNumber: number }) {
        return await this.prisma.user.findUnique({
            where: {
                phoneNumber: data.phoneNumber
            }
        })
    }

    async createUser(data: { phoneNumber: number, password: string }) {
        return await this.prisma.user.create({
            data
        })
    }
}