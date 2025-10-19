import { Injectable } from "@nestjs/common";
import { ProfileRepository } from "./profile.repository";
import { UserRepository } from "../user/user.repository";

@Injectable()
export class ProfileService {
    constructor(private readonly profileRepo: ProfileRepository, private readonly userRepo: UserRepository) { }

    
}