import { forwardRef, Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ProfileModule } from "../profile/profile.module";

@Module({
    imports: [UserModule, PrismaModule, forwardRef(() => ProfileModule), JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: "1d" }
    })],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { }