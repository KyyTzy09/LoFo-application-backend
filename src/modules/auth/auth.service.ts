import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../user/user.repository";
import { GetSessionDto, LoginDto, RegisterDto } from "./auth.dto";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { ProfileRepository } from "../profile/profile.repository";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private readonly userRepo: UserRepository, private readonly profileRepo: ProfileRepository) { }

    async register(dto: RegisterDto) {
        const existingUser = await this.userRepo.getByPhoneNumber({ phoneNumber: dto.phoneNumber })
        if (existingUser) {
            throw new ConflictException("Nomor telepon ini sudah pernah digunakan")
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10)
        const createdUser = await this.userRepo.createUser({ phoneNumber: dto.phoneNumber, password: hashedPassword })
        await this.profileRepo.createProfile({ userId: createdUser.userId, name: dto.username })
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
        const accessToken = await this.jwtService.sign({ userId: existingUser.userId }, {
            expiresIn: "1d",
        })

        return { message: "Login berhasil", statusCode: HttpStatus.OK, accessToken }
    }

    async getSession(dto: GetSessionDto) {
        const existingUser = await this.userRepo.getByUserId({ userId: dto.userId })
        if (!existingUser) {
            throw new NotFoundException("Akun tidak ditemukan")
        }

        return { message: "Berhasil mendapatkan sesi login", statusCode: HttpStatus.OK, data: existingUser }
    }
}