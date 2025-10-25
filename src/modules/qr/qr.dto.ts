import { IsNotEmpty, IsString } from "class-validator";

export class GenerateQRDto {
    @IsString()
    @IsNotEmpty()
    itemId: string
}

export class UploadQRDto {
    @IsNotEmpty()
    qrImage: Buffer
}