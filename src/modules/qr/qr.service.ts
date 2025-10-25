import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GenerateQRDto, UploadQRDto } from "./qr.dto";
import * as QrCode from "qrcode"
import cloudinary from "src/shared/configs/cloudinary.config";

@Injectable()
export class Qrservice {
    constructor() { }

    async generateQR(dto: GenerateQRDto): Promise<Buffer> {
        const qrDataurl = await QrCode.toDataURL(dto.itemId, {
            type: "image/png",
            width: 300,
            margin: 1,
        })

        const image = Buffer.from(qrDataurl.split(",")[1], "base64")
        return image
    }

    async uploadQr(dto: UploadQRDto): Promise<{ data: string }> {
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({
                allowed_formats: ["jpg", "png", "webp"],
                folder: "qr",
            },
                (err, res) => {
                    if (err) reject(new HttpException(err?.message || "Cloudinary uploader error", HttpStatus.INTERNAL_SERVER_ERROR))
                    else resolve(res)
                })
            stream.end(dto.qrImage)
        })

        return { data: (result as { secure_url: string }).secure_url }
    }
}