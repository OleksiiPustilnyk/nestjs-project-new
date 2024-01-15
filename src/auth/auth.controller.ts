import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/create-auth.dto'
import { IgnoreAuth } from 'src/decorators/ignore-auth.decorator'
import { IgnoreExistence } from 'src/decorators/ignore-existence.decorator'

@Controller('auth')
@IgnoreAuth()
@IgnoreExistence()
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signIn(@Body() signInDto: AuthDto) {
        return this.authService.signIn(signInDto)
    }
    @Post('register')
    register(@Body() registerDto: AuthDto) {
        return this.authService.register(registerDto)
    }
}
