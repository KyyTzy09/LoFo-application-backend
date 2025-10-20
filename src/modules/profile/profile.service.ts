import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { ProfileRepository } from "./profile.repository";
import { UserRepository } from "../user/user.repository";
import { GetProfileDto, UpdateAddressDto, UpdateInfoDto, UpdateProfileDto, UpdateUsernameDto } from "./profile.dto";

@Injectable()
export class ProfileService {
    constructor(private readonly profileRepo: ProfileRepository, private readonly userRepo: UserRepository) { }

    async getUserProfile(dto: GetProfileDto) {
        const existingProfile = await this.profileRepo.findByUserId({ userId: dto.userId })
        if (!existingProfile) {
            throw new NotFoundException("Profile not found")
        }

        return { message: "Profile retrieved successfull", statusCode: HttpStatus.OK, data: existingProfile }
    }

    async updateUsername(dto: UpdateUsernameDto) {
        const existingProfile = await this.profileRepo.findByUserId({ userId: dto.userId })
        if (!existingProfile) {
            throw new NotFoundException("Profile not found")
        }

        const updatedUsername = await this.profileRepo.updateUsername(dto)
        return { message: "Username updated successfull", statusCode: HttpStatus.OK, data: updatedUsername }
    }

    async updateInfo(dto: UpdateInfoDto) {
        const existingProfile = await this.profileRepo.findByUserId({ userId: dto.userId })
        if (!existingProfile) {
            throw new NotFoundException("Profile not found")
        }

        const updatedInfo = await this.profileRepo.updateInfo(dto)
        return { message: "Info updated successfull", statusCode: HttpStatus.OK, data: updatedInfo }
    }

    async updateAddress(dto: UpdateAddressDto) {
        const existingProfile = await this.profileRepo.findByUserId({ userId: dto.userId })
        if (!existingProfile) {
            throw new NotFoundException("Profile not found")
        }

        const updatedAddress = await this.profileRepo.updateAddress(dto)
        return { message: "Info updated successfull", statusCode: HttpStatus.OK, data: updatedAddress }
    }

    async updateProfile(dto: UpdateProfileDto) {
        const existingProfile = await this.profileRepo.findByUserId({ userId: dto.userId })
        if (!existingProfile) {
            throw new NotFoundException("Profile not found")
        }

        const updatedProfile = await this.profileRepo.updateProfile(dto)
        return { message: "Profile updated successfull", statusCode: HttpStatus.OK, data: updatedProfile }
    }

}