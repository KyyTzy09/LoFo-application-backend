import { Controller, Patch, Req, UseGuards } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { UpdateAddressDto, UpdateInfoDto, UpdateProfileDto, UpdateUsernameDto } from "./profile.dto";

@Controller("profile")
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    // Update username user
    @Patch("username/update")
    @UseGuards(AuthGuard)
    updateUsername(@Req() req, dto: UpdateUsernameDto) {
        return this.profileService.updateUsername({ userId: req.user.userId, username: dto.username })
    }

    // Update info user
    @Patch("info/update")
    @UseGuards(AuthGuard)
    updateInfo(@Req() req, dto: UpdateInfoDto) {
        return this.profileService.updateInfo({ userId: req.user.userId, info: dto.info })
    }

    // Update address user
    @Patch("address/update")
    @UseGuards(AuthGuard)
    updateAddress(@Req() req, dto: UpdateAddressDto) {
        return this.profileService.updateAddress({ userId: req.user.userId, address: dto.address })
    }

    // Update full profile
    @Patch("update")
    @UseGuards(AuthGuard)
    updateProfile(@Req() req, dto: UpdateProfileDto) {
        return this.profileService.updateProfile({ userId: req.user.userId, username: dto.username, info: dto.info, address: dto.address })
    }
} 