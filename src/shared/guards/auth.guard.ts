import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { UserRepository } from "src/modules/user/user.repository";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService, private readonly userRepo: UserRepository) { }
    private extractTokenFromHeader(req: Request) {
        const [type, token] = req.headers.authorization?.split(" ") ?? []
        return type === "Bearer" ? token : undefined
    }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)
        if (!token) {
            throw new UnauthorizedException("Token tidak ada")
        }

        try {
            const payload = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET
            }) as { userId: string }

            const existingUser = await this.userRepo.getByUserId({ userId: payload.userId })
            if (!existingUser) {
                throw new UnauthorizedException("Pengguna tidak ditemukan")
            }

            request['user'] = existingUser
        } catch (error) {
            throw new UnauthorizedException("Token tidak valid")
        }
        return true
    }
}