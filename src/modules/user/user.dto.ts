import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class UserDto implements User {
    @ApiProperty({ example: "xxxxxxxxxxxxxxxxxxxxx" })
    userId: string;
    @ApiProperty({ example: "6212345678" })
    phoneNumber: string;
    @ApiProperty({ example: "Password1234" })
    password: string;
    @ApiProperty({ example: "2025-10-25T08:17:12.584Z" })
    createdAt: Date;
    @ApiProperty({ example: "2025-10-25T08:17:12.584Z" })
    updatedAt: Date;
}