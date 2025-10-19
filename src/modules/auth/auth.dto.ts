import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsPhoneNumber("ID")
    phoneNumber: string

    @IsString()
    @IsNotEmpty()
    password: string


    @IsString()
    @IsNotEmpty()
    username: string
}

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    phoneNumber: string

    @IsString()
    @IsNotEmpty()
    password: string
}

export class GetSessionDto {
    @IsString()
    @IsNotEmpty()
    userId: string
} 
