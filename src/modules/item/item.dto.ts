import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateNewItemDto {
    @IsString()
    @IsOptional()
    userId: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsOptional()
    image: string

    @IsString()
    @IsNotEmpty()
    info: string
}

export class GetItemByIdDto {
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

    @IsNotEmpty()
    @IsString()
    itemId: string

    @IsNotEmpty()
    @IsString()
    status: string
}

export class DeleteItemDto {
    @IsNotEmpty()
    @IsString()
    userId: string

    @IsNotEmpty()
    @IsString()
    itemId: string
}