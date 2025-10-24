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