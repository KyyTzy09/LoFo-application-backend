import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    onModuleInit() {
        this.$connect()
        console.log("Db Connected")
    }

    onModuleDestroy() {
        this.$disconnect()
        console.log("Db Disconnected")
    }
}