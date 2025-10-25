import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "@prisma/client";

// Full type
export class ProfileDto implements Profile {
    @ApiProperty({ example: "xxxxxxxxxxxxx" })
    userId: string;
    @ApiProperty({ example: "John Doe" })
    username: string;
    @ApiProperty({ example: "Ini adalah John Doe" })
    info: string | null;
    @ApiProperty({ example: "Kec.Ajibarang, Kab.Jawa Barat" })
    address: string | null;
}

// Type Username
export class UsernameDto implements Partial<Profile> {
    @ApiProperty({ example: "John Doe" })
    username: string;
}

// Type Info
export class InfoDto implements Partial<Profile> {
    @ApiProperty({ example: "Ini adalah John Doe" })
    info: string;
}

// Type Alamat
export class AddressDto implements Partial<Profile> {
    @ApiProperty({ example: "Kec.Ajibarang, Kab.Jawa Barat" })
    address: string;
}

export class GetProfileResponseDto {
    @ApiProperty({ example: "Profile retrieved Successfull" })
    message: string

    @ApiProperty({ example: HttpStatus.OK })
    statusCode: number

    @ApiProperty({ type: ProfileDto })
    data: ProfileDto
}

export class UpdateProfileResponseDto {
    @ApiProperty({ example: "Profile updated Successfull" })
    message: string

    @ApiProperty({ example: HttpStatus.OK })
    statusCode: number

    @ApiProperty({ type: ProfileDto })
    data: ProfileDto
}

export class UpdateUsernameResponseDto {
    @ApiProperty({ example: "Username updated Successfull" })
    message: string

    @ApiProperty({ example: HttpStatus.OK })
    statusCode: number

    @ApiProperty({ type: UsernameDto })
    data: UsernameDto
}

export class UpdateInfoResponseDto {
    @ApiProperty({ example: "Info updated Successfull" })
    message: string

    @ApiProperty({ example: HttpStatus.OK })
    statusCode: number

    @ApiProperty({ type: InfoDto })
    data: InfoDto
}

export class UpdateAddressResponseDto {
    @ApiProperty({ example: "Address updated Successfull" })
    message: string
    
    @ApiProperty({ example: HttpStatus.OK })
    statusCode: number

    @ApiProperty({ type: AddressDto })
    data: AddressDto
}
