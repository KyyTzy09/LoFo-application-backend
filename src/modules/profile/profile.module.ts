import { Module } from "@nestjs/common";
import { ProfileController } from "./profile.controller";
import { ProfileRepository } from "./profile.repository";
import { UserModule } from "../user/user.module";
import { PrismaModule } from "../prisma/prisma.module";
import { ProfileService } from "./profile.service";

@Module({
    imports: [PrismaModule, UserModule],
    controllers: [ProfileController],
    providers: [ProfileService, ProfileRepository],
    exports: [ProfileRepository]
})
export class ProfileModule { }