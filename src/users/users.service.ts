import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class UsersService {
    constructor(private databaseService: DatabaseService) {}

    create(createUserDto: CreateUserDto) {
        const { address, ...user } = createUserDto
        return this.databaseService.user.create({
            data: {
                ...user,
                ...(address && {
                    address: {
                        createMany: { data: [] },
                    },
                }),
            },
        })
    }

    findById(id: string) {
        return this.databaseService.user.findUnique({
            where: { id },
            include: { address: true },
        })
    }

    findByEmail(email: string) {
        return this.databaseService.user.findUnique({
            where: { email },
            include: { address: true },
        })
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        const { address, ...data } = updateUserDto
        return this.databaseService.$transaction(async tx => {
            const pendingUpdates: Promise<any>[] = []
            for (const a of address || []) {
                pendingUpdates.push(
                    tx.address.update({ where: { id: a.id }, data: a }),
                )
            }

            await Promise.all(pendingUpdates)

            return tx.user.update({
                where: { id },
                data,
            })
        })
    }

    remove(id: string) {
        return this.databaseService.user.delete({ where: { id } })
    }
}
