import { Body, Controller, Get, Patch, Req, UseGuards } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { UpdateAddressDto, UpdateInfoDto, UpdateProfileDto, UpdateUsernameDto } from "./profile.dto";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetProfileResponseDto, UpdateAddressResponseDto, UpdateInfoResponseDto, UpdateProfileResponseDto, UpdateUsernameResponseDto } from "./profile.response.dto";

@ApiTags("Profile-path")
@Controller("profile")
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }
    // Get your profile data
    @ApiResponse({ type: GetProfileResponseDto })
    @Get("get")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    getProfile(@Req() req) {
        return this.profileService.getUserProfile({ userId: req.user.userId })
    }

    // Update username user
    @ApiResponse({ type: UpdateUsernameResponseDto })
    @Patch("username/update")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    updateUsername(@Req() req, @Body() dto: UpdateUsernameDto) {
        return this.profileService.updateUsername({ userId: req.user.userId, username: dto.username })
    }

    // Update info user
    @ApiResponse({ type: UpdateInfoResponseDto })
    @Patch("info/update")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    updateInfo(@Req() req, @Body() dto: UpdateInfoDto) {
        return this.profileService.updateInfo({ userId: req.user.userId, info: dto.info })
    }

    // Update address user
    @ApiResponse({ type: UpdateAddressResponseDto })
    @Patch("address/update")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    updateAddress(@Req() req, @Body() dto: UpdateAddressDto) {
        return this.profileService.updateAddress({ userId: req.user.userId, address: dto.address })
    }

    // Update full profile
    @ApiResponse({ type: UpdateProfileResponseDto })
    @Patch("update")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    updateProfile(@Req() req, @Body() dto: UpdateProfileDto) {
        return this.profileService.updateProfile({ userId: req.user.userId, username: dto.username, info: dto.info, address: dto.address })
    }
} 