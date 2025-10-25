import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { GetSessionResponseDto, LoginResponseDto, RegisterResponseDto } from "./auth.response.dto";
import { LoginDto, RegisterDto } from './auth.dto'
import { AuthGuard } from "src/shared/guards/auth.guard";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from "../user/user.dto";

@ApiTags("Auth-path")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    // Register
    @ApiResponse({ status: HttpStatus.CREATED, description: "User created successfull", type: RegisterResponseDto })
    @Post("register")
    @ApiResponse({ type: UserDto })
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto)
    }

    // Login
    @ApiResponse({ status: HttpStatus.OK, description: "Login successfull", type: LoginResponseDto })
    @Post("login")
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    }

    // Check login session
    @ApiResponse({ status: HttpStatus.OK, description: "User retrieved successfully", type: GetSessionResponseDto })
    @Get("session")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    getSession(@Req() req) {
        return this.authService.getSession({ userId: req.user.userId })
    }
}