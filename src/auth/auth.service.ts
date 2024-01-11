import * as bcrypt from 'bcrypt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import { AuthDto } from './dto/create-auth.dto'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(signInDto: AuthDto) {
        const signInUser = await this.usersService.finaByEmail(signInDto.email)

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
        const payload = { sub: user.id, email: user.email }
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }
}
