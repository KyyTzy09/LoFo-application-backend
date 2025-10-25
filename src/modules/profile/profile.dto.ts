import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class GetProfileDto {
    @IsString()
    @IsNotEmpty()
    userId: string
}

export class UpdateProfileDto {
    @IsString()
    @IsOptional()
    userId: string

    @ApiProperty({
        name: "username",
        type: "string",
        description: "Isi dengan nama baru",
        example: "John doe"
    })
    @IsString()
    @IsNotEmpty()
    username: string

    @ApiProperty({
        name: "info",
        minimum: 3,
        type: "string",
        description: "Isi dengan info baru dengan minimal 3 karakter",
        example: "Hai namaku..."
    })
    @IsString()
    @IsNotEmpty()
    @Min(3)
    info: string

    @ApiProperty({
        name: "address (alamat)",
        type: "string",
        description: "Isi dengan alamat baru dengan minimal 3 karakter",
        example: "Purwokerto, Kab Banyumas......."
    })
    @IsString()
    @IsNotEmpty()
    @Min(3)
    address: string
}

export class UpdateUsernameDto {
    @IsString()
    @IsOptional()
    userId: string

    @ApiProperty({
        name: "username",
        type: "string",
        description: "Isi dengan nama baru",
        example: "John doe"
    })
    @IsString()
    @IsNotEmpty()
    username: string
}

export class UpdateInfoDto {
    @IsString()
    @IsOptional()
    userId: string

    @ApiProperty({
        name: "info",
        minimum: 3,
        type: "string",
        description: "Isi dengan info baru dengan minimal 3 karakter",
        example: "Hai namaku..."
    })
    @IsString()
    @IsNotEmpty()
    @Min(3)
    info: string
}

export class UpdateAddressDto {
    @IsString()
    @IsOptional()
    userId: string

    @ApiProperty({
        name: "address (alamat)",
        type: "string",
        description: "Isi dengan alamat baru dengan minimal 3 karakter",
        example: "Purwokerto, Kab Banyumas......."
    })
    @IsString()
    @IsNotEmpty()
    address: string
}