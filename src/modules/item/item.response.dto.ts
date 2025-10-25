import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { $Enums, Item } from "@prisma/client";

export class ItemDto implements Item {
    @ApiProperty({ example: "xxxxxxxxxxxxxxxx" })
    itemId: string;
    @ApiProperty({ example: "https://image-link.com" })
    image: string;
    @ApiProperty({ example: "Laptop Lenovo LOQ" })
    itemName: string;
    @ApiProperty({ example: "This is my laptop" })
    itemInfo: string | null;
    @ApiProperty({ example: "https://image-link.com" })
    qrUrl: string | null;
    @ApiProperty({ example: "TERSEDIA" })
    status: $Enums.ItemStatus;
    @ApiProperty({ example: "xxxxxxxxxxxxxxxx" })
    userId: string;
}

export class CreateItemResponseDto {
    @ApiProperty({ example: "Item created Successfull" })
    message: string
    @ApiProperty({ example: HttpStatus.CREATED })
    statusCode: number

    @ApiProperty({ type: ItemDto })
    data: ItemDto
}

export class GetItemByIdResponseDto {
    @ApiProperty({ example: "Item data retrieved Successfull" })
    message: string
    @ApiProperty({ example: HttpStatus.OK })
    statusCode: number

    @ApiProperty({ type: ItemDto })
    data: ItemDto
}

export class GetAllItemsResponseDto {
    @ApiProperty({ example: "Items retrieved Successfull" })
    message: string
    @ApiProperty({ example: HttpStatus.CREATED })
    statusCode: number

    @ApiProperty({ type: ItemDto, isArray: true })
    data: ItemDto
}

export class GetuserItemsResponseDto {
    @ApiProperty({ example: "Items retrieved Successfull" })
    message: string
    @ApiProperty({ example: HttpStatus.CREATED })
    statusCode: number

    @ApiProperty({ type: ItemDto, isArray: true })
    data: ItemDto
}

export class UpdateItemStatusResponseDto {
    @ApiProperty({ example: "Item updated Successfull" })
    message: string
    @ApiProperty({ example: HttpStatus.OK })
    statusCode: number

    @ApiProperty({ type: ItemDto })
    data: ItemDto
}

export class DeleteItemResponseDto {
    @ApiProperty({ example: "Item deleted Successfull" })
    message: string
    @ApiProperty({ example: HttpStatus.OK })
    statusCode: number

    @ApiProperty({ type: ItemDto })
    data: ItemDto
}