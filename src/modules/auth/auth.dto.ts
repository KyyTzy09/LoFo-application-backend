import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @ApiProperty({
        name: "phoneNumber (Nomor hp)",
        type: "string",
        description: "Isi dengan format Kode negara + nomor",
        example: "6212345678"
    })
    @IsNotEmpty()
    @IsPhoneNumber("ID")
    phoneNumber: string

    @ApiProperty({
        name: "password",
        type: "string",
        minimum: 7,
        description: "Password berupa string dengan minimal 7 karakter",
        example: "Aku1234567"
    })
    @MinLength(7)
    @IsString()
    @IsNotEmpty()
    password: string

    @ApiProperty({
        name: "username",
        type: "string",
        description: "Isi nama yang ingin kamu buat",
        example: "John doe"
    })
    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    username: string
}

export class LoginDto {
    @ApiProperty({
        name: "phoneNumber (Nomor hp)",
        type: "string",
        description: "Isi dengan format Kode negara + nomor",
        example: "6212345678"
    })
    @IsNotEmpty()
    @IsPhoneNumber("ID")
    phoneNumber: string

    @ApiProperty({
        name: "password",
        type: "string",
        minimum: 7,
        description: "Password berupa string dengan minimal 7 karakter",
        example: "Aku1234567"
    })
    @MinLength(7)
    @IsString()
    @IsNotEmpty()
    password: string
}

export class GetSessionDto {
    @IsString()
    @IsNotEmpty()
    userId: string
} 
