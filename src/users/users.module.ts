import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
// import { DatabaseModule } from 'src/database/database.module'
// import { AuthService } from 'src/auth/auth.service'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma.service'
// import { AuthController } from 'src/auth/auth.controller'

@Module({
    providers: [UsersService, PrismaService, JwtService],
    controllers: [UsersController],
})
export class UsersModule {}
