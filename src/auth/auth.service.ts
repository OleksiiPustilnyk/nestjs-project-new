import * as bcrypt from 'bcrypt'
import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'

import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import { AuthDto } from './dto/create-auth.dto'

@Injectable()
export class AuthService {
    tokenService: any
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(signInDto: AuthDto) {
        const signInUser = await this.usersService.findByEmail(signInDto.email)

        if (!signInUser) {
            throw new UnauthorizedException()
        }

        const isSamePassword = await bcrypt.compare(
            signInDto.password,
            signInUser.password ?? '',
        )

        if (!isSamePassword) {
            throw new UnauthorizedException()
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...user } = signInDto

        const tokens = await this.tokenService.generateTokens(signInDto)

        return Object.assign(user, tokens)
    }

    async register(registerDto: AuthDto) {
        const existingUser = await this.usersService.findByEmail(
            registerDto.email,
        )

        if (existingUser) {
            throw new ConflictException()
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(registerDto.password, salt)

        const createdUser = await this.usersService.create({
            email: registerDto.email,
            password: hashedPassword,
        })

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...user } = createdUser
        const tokens = await this.tokenService.generateTokens({
            id: user.id,
            email: user.email,
        })

        return Object.assign(user, tokens)
    }
}
