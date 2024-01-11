import { Injectable, NotFoundException } from '@nestjs/common'
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

    finaByEmail(email: string) {
        return this.databaseService.user.findUnique({
            where: { email },
            include: { address: true },
        })
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        // const () = this.findById(id)
        // if (!existingEntry) {
        //     throw new NotFoundException()
        // }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { address, ...data } = updateUserDto
        return this.databaseService.$transaction(async tx => {
            const pendingUpdates: Promise<any>[] = []
            for (const a of address || []) {
                // noinspection TypeScriptValidateJSTypes
                pendingUpdates.push(
                    tx.address.update({ where: { id: a.id }, data: a }),
                )
            }

            // Updating all addresses
            await Promise.all(pendingUpdates)

            // Updating user in the end
            // noinspection TypeScriptValidateJSTypes
            return tx.user.update({
                where: { id },
                data,
            })
        })
    }

    remove(id: string) {
        // const existingEntry = this.findById(id)
        // if (!existingEntry) {
        //     throw new NotFoundException()
        // }
        return this.databaseService.user.delete({ where: { id } })
    }
}
