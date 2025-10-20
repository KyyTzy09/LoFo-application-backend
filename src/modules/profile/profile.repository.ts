import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Profile } from "@prisma/client";
import { GetBatchResult } from "@prisma/client/runtime/library";

@Injectable()
export class ProfileRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createProfile(data: { userId: string, name: string }): Promise<Profile> {
        return await this.prisma.profile.create({
            data: {
                username: data.name,
                userId: data.userId
            }
        })
    }

    async findByUserId(data: { userId: string }): Promise<Profile | null> {
        return await this.prisma.profile.findUnique({
            where: {
                userId: data.userId
            }
        })
    }

    async updateProfile(data: { userId: string, username: string, info: string, address: string }): Promise<Profile> {
        return await this.prisma.profile.update({
            where: {
                userId: data.userId
            },
            data: {
                username: data.username,
                info: data.info,
                address: data.address
            }
        })
    }
}