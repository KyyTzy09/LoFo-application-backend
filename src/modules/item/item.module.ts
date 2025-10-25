import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { UserModule } from "../user/user.module";
import { ItemService } from "./item.service";
import { ItemRepository } from "./item.repository";
import { ItemController } from "./item.controller";
import { QRModule } from "../qr/qr.module";

@Module({
    imports: [PrismaModule, UserModule, QRModule],
    controllers: [ItemController],
    providers: [ItemService, ItemRepository],
    exports: [ItemRepository]
})
export class ItemModule { }