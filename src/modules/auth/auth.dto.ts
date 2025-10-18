import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RegisterDto {
    @IsNumber()
    @IsNotEmpty()
    phoneNumber : number

    @IsString()
    @IsNotEmpty()
    password:string
}