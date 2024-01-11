import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import isValidObjectId from '../utils/isValidObjectId'
import { SetDatabaseName } from 'src/decorators/set-database.decorator'

@Controller('users')
@SetDatabaseName('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        if (isValidObjectId(id)) {
            return this.usersService.findById(id)
        } else {
            return this.usersService.findByEmail(id)
        }
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id)
    }
}
