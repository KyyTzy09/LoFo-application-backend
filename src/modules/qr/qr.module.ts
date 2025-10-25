import { Module } from "@nestjs/common";
import { Qrservice } from "./qr.service";

@Module({
    providers: [Qrservice],
    exports: [Qrservice]
})
export class QRModule { }