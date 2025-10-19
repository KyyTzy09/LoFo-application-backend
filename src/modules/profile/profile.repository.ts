import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Profile } from "@prisma/client";

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
}