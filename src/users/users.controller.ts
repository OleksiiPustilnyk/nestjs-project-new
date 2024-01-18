import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
// import { CreateUserDto } from './dto/create-user.dto'
// import { UpdateUserDto } from './dto/update-user.dto'
// import isValidObjectId from '../utils/isValidObjectId'
import { JwtGuard } from 'src/auth/guard/jwt.guard'
// import { SetDatabaseName } from 'src/decorators/set-database.decorator'

@Controller('user')
// @SetDatabaseName('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // @Post()
    // create(@Body() createUserDto: CreateUserDto) {
    //     return this.usersService.create(createUserDto)
    // }

    @UseGuards(JwtGuard)
    @Get(':id')
    async getUserProfile(@Param('id') id) {
        return await this.usersService.findById(id)
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //     return this.usersService.update(id, updateUserDto)
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.usersService.remove(id)
    // }
}
