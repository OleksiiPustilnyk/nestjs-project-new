import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
// import { UsersModule } from 'src/users/users.module'
// import { TokenModule } from 'src/token/token.module'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma.service'

@Module({
    // imports: [UsersModule, TokenModule],
    providers: [AuthService, UsersService, PrismaService, JwtService],
    controllers: [AuthController],
})
export class AuthModule {}
