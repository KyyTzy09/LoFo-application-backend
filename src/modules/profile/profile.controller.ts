import { Controller, Patch, Req, UseGuards } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { UpdateProfileDto } from "./profile.dto";

@Controller("profile")
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @Patch("update")
    @UseGuards(AuthGuard)
    updateProfile(@Req() req, dto: UpdateProfileDto) {
        return this.profileService.updateProfile({ userId: req.user.userId, username: dto.username, info: dto.info, address: dto.address })
    }
} 