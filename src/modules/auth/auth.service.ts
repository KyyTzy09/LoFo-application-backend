import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../user/user.repository";
import { LoginDto, RegisterDto } from "./auth.dto";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private readonly userRepo: UserRepository) { }

    async register(dto: RegisterDto) {
        const existingUser = await this.userRepo.getByPhoneNumber({ phoneNumber: dto.phoneNumber })
        if (existingUser) {
            throw new ConflictException("Nomor telepon ini sudah pernah digunakan")
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10)
        const createdUser = await this.userRepo.createUser({ phoneNumber: dto.phoneNumber, password: hashedPassword })
        return { message: "Berhasil membuat akun baru", statusCode: HttpStatus.CREATED, data: createdUser }
    }

    async login(dto: LoginDto) {
        const existingUser = await this.userRepo.getByPhoneNumber({ phoneNumber: dto.phoneNumber })
        if (!existingUser) {
            throw new NotFoundException("Akun tidak ditemukan")
        }

        const comparePassword = await bcrypt.compare(dto.password, existingUser.password)
        if (!comparePassword) {
            throw new BadRequestException("Password yang anda masukan salah")
        }
        const accessToken = this.jwtService.sign({ userId: existingUser.userId }, {
            expiresIn: "1d",
        })

        return { message: "Login berhasil", statusCode: HttpStatus.OK, accessToken }
    }
}