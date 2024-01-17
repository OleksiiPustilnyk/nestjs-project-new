import { Injectable, UnauthorizedException } from '@nestjs/common'
import { SignInDto } from './dto/auth.dto'
import { UsersService } from '../users/users.service'
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

const EXPIRE_TIME = 20 * 1000

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signin(dto: SignInDto) {
        const user = await this.validateUser(dto)
        const payload = {
            email: user.email,
            sub: {
                name: user.name,
            },
        }

        return {
            user,
            backendTokens: {
                accessToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '20s',
                    secret: process.env.jwtSecretKey,
                }),
                refreshToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '7d',
                    secret: process.env.jwtRefreshTokenKey,
                }),
                expiresIn: new Date().setTime(
                    new Date().getTime() + EXPIRE_TIME,
                ),
            },
        }
    }

    async validateUser(dto: SignInDto) {
        const user = await this.usersService.findByEmail(dto.email)

        if (user && (await compare(dto.password, user.password))) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user
            return result
        }
        throw new UnauthorizedException()
    }

    async refreshToken(user: any) {
        const payload = {
            email: user.email,
            sub: user.sub,
        }

        return {
            accessToken: await this.jwtService.signAsync(payload, {
                expiresIn: '20s',
                secret: process.env.jwtSecretKey,
            }),
            refreshToken: await this.jwtService.signAsync(payload, {
                expiresIn: '7d',
                secret: process.env.jwtRefreshTokenKey,
            }),
            expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
        }
    }
}
