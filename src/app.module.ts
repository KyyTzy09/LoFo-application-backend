import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ItemModule } from './modules/item/item.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, ProfileModule, ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
