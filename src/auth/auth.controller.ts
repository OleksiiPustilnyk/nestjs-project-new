import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersService } from './../users/users.service'
// import { AuthDto } from './dto/create-auth.dto'
import { CreateUserDto } from 'src/users/dto/user.dto'
import { SignInDto } from './dto/auth.dto'
import { RefreshJwtGuard } from './guard/refresh.guard'
// import { IgnoreAuth } from 'src/decorators/ignore-auth.decorator'
// import { IgnoreExistence } from 'src/decorators/ignore-existence.decorator'

@Controller('auth')
// @IgnoreAuth()
// @IgnoreExistence()
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) {}

    // @HttpCode(HttpStatus.OK)

    @Post('register')
    async registerUser(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto)
    }
    @Post('signin')
    async signin(@Body() dto: SignInDto) {
        return this.authService.signin(dto)
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refreshToken(@Request() req) {
        console.log('refreshed')

        return await this.authService.refreshToken(req.user)
    }
}
