import { Body, Controller, Get, Patch, Req, UseGuards } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { UpdateAddressDto, UpdateInfoDto, UpdateProfileDto, UpdateUsernameDto } from "./profile.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Profile-path")
@Controller("profile")
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }
    // Get your profile data
    @Get("get")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    getProfile(@Req() req) {
        return this.profileService.getUserProfile({ userId: req.user.userId })
    }

    // Update username user
    @Patch("username/update")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    updateUsername(@Req() req, @Body() dto: UpdateUsernameDto) {
        return this.profileService.updateUsername({ userId: req.user.userId, username: dto.username })
    }

    // Update info user
    @Patch("info/update")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    updateInfo(@Req() req, @Body() dto: UpdateInfoDto) {
        return this.profileService.updateInfo({ userId: req.user.userId, info: dto.info })
    }

    // Update address user
    @Patch("address/update")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    updateAddress(@Req() req, @Body() dto: UpdateAddressDto) {
        return this.profileService.updateAddress({ userId: req.user.userId, address: dto.address })
    }

    // Update full profile
    @Patch("update")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    updateProfile(@Req() req, @Body() dto: UpdateProfileDto) {
        return this.profileService.updateProfile({ userId: req.user.userId, username: dto.username, info: dto.info, address: dto.address })
    }
} 