import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "../user/user.repository";
import { RegisterDto } from "./auth.dto";

@Injectable()
export class AuthService {
    constructor(private readonly userRepo: UserRepository) { }

    async register(dto: RegisterDto) {
        const existingUser = await this.userRepo.getByPhoneNumber({ phoneNumber: dto.phoneNumber })
        if (existingUser) {
            throw new ConflictException("Nomor telepon ini sudah pernah digunakan")
        }

        const createdUser = await this.userRepo.createUser(dto)
        return { message: "Berhasil membuat akun baru", statusCode: HttpStatus.CREATED, data: createdUser }
    }
}