import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { ProfileRepository } from "./profile.repository";
import { UserRepository } from "../user/user.repository";
import { UpdateProfileDto } from "./profile.dto";

@Injectable()
export class ProfileService {
    constructor(private readonly profileRepo: ProfileRepository, private readonly userRepo: UserRepository) { }

    async updateProfile(dto: UpdateProfileDto) {
        const existingProfile = await this.profileRepo.findByUserId({ userId: dto.userId })
        if (!existingProfile) {
            throw new NotFoundException("Profile not found")
        }

        const updatedProfile = await this.profileRepo.updateProfile(dto)
        return { message: "Profile updated successfull", statusCode: HttpStatus.OK, data: updatedProfile }
    }
}