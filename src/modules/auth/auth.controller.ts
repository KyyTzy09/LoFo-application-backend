import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./auth.dto";
import { AuthGuard } from "src/shared/guards/auth.guard";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    // Register
    @Post("register")
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto)
    }

    // Login
    @Post("login")
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    }

    // Check login session
    @Get("session")
    @UseGuards(AuthGuard)
    getSession(@Req() req) {
        return this.authService.getSession({ userId: req.user.userId })
    }
}