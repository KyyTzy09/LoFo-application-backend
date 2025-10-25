import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateNewItemDto {
    @IsString()
    @IsOptional()
    userId: string

    @ApiProperty({
        name: "name",
        type: "string",
        description: "Simpan barang dengan nama yang diinginkan",
        example: "Barang-A"
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        name: "file",
        type: "null",
        description: "(Note: Di body bernama file bukan image) Masukan file gambar/foto barang yang akan ditambahkan",
    })
    @IsString()
    @IsOptional()
    image: string

    @ApiProperty({
        name: "info",
        type: "string",
        description: "Masukan deskripsi tentang barang yang ingin ditambahkan",
        example: "Ini adalah barang......"
    })
    @IsString()
    @IsNotEmpty()
    info: string
}

export class GetItemByIdDto {
    @ApiProperty({
        name: "itemId",
        type: "string",
        description: "Parameter Item Id",
        example: "xxxxxx-xxxxx...."
    })
    @IsString()
    @IsNotEmpty()
    itemId: string
}

export class GetUserItemsDto {
    @IsString()
    @IsNotEmpty()
    userId: string
}

export class UpdateItemStatusDto {
    @IsOptional()
    @IsString()
    userId: string

    @ApiProperty({
        name: "itemId",
        type: "string",
        description: "Masukan Id barang yang akan di update",
        example: "xxxxxx-xxxxx...."
    })
    @IsNotEmpty()
    @IsString()
    itemId: string

    @ApiProperty({
        name: "status",
        type: "string",
        description: "Isi dengan string dengan TERSEDIA atau HILANG (Note :Harus sama tidak boleh beda!!)",
        example: "TERSEDIA"
    })
    @IsNotEmpty()
    @IsString()
    status: string
}

export class DeleteItemDto {
    @IsNotEmpty()
    @IsString()
    userId: string

    @ApiProperty({
        name: "itemId",
        type: "string",
        description: "Parameter id barang(ItemId)",
        example: "xxxxxx-xxxxx...."
    })
    @IsNotEmpty()
    @IsString()
    itemId: string
}