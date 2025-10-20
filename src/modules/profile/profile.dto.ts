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

    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    @Min(3)
    info: string

    @IsString()
    @IsNotEmpty()
    @Min(3)
    address: string
}

export class UpdateUsernameDto {
    @IsString()
    @IsOptional()
    userId: string

    @IsString()
    @IsNotEmpty()
    username: string
}

export class UpdateInfoDto {
    @IsString()
    @IsOptional()
    userId: string

    @IsString()
    @IsNotEmpty()
    @Min(3)
    info: string
}

export class UpdateAddressDto {
    @IsString()
    @IsOptional()
    userId: string

    @IsString()
    @IsNotEmpty()
    address: string
}