import { HttpStatus } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { UserDto } from "../user/user.dto"

export class RegisterResponseDto {
    @ApiProperty({ example: "Register successfull" })
    message: string
    @ApiProperty({ example: HttpStatus.CREATED })
    statusCode: number
    @ApiProperty({ type: UserDto })
    data: UserDto
}

export class LoginResponseDto {
    @ApiProperty({ example: "Login successfull" })
    message: string
    @ApiProperty({ example: HttpStatus.OK })
    statusCode: number
    @ApiProperty({ example: "1edewbrwrfshjkfbkufewjfbwejbfke" })
    accessToken: string
}

export class GetSessionResponseDto {
    @ApiProperty({ example: "User data retrieved successfull" })
    message: string
    @ApiProperty({ example: HttpStatus.OK })
    statusCode: number
    @ApiProperty({ type: UserDto })
    data: UserDto
}