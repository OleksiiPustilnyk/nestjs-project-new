import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class UsersService {
    constructor(private databaseService: DatabaseService) {}

    create(createUserDto: CreateUserDto) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...data } = createUserDto
        return this.databaseService.user.create({
            data: {
                ...data,
                address: {
                    create: [],
                },
            },
        })
    }

    findOne(id: string) {
        return this.databaseService.user.findUnique({ where: { id } })
    }

    update(id: string, updateUserDto: Partial<UpdateUserDto>) {
        // eslint-disable-next-line
        const { address, ...data } = updateUserDto
        return this.databaseService.user.update({
            where: { id },
            data: {
                ...data,
            },
        })
    }

    remove(id: string) {
        return this.databaseService.user.delete({ where: { id } })
    }
}
