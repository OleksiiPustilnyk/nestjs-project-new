import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class ItemsService {
    constructor(private readonly databaseServise: DatabaseService) {}
    async create(createItemDto: Prisma.ItemsCreateInput) {
        return this.databaseServise.items.create({
            data: {
                name: createItemDto.name,
                price: createItemDto.price,
                avalibility: createItemDto.avalibility,
                description: {
                    create: {
                        content: createItemDto.description.content,
                    },
                },
            },
        })
    }

    async findAll() {
        return this.databaseServise.items.findMany({})
    }

    async findOne(id: string) {
        return this.databaseServise.items.findUnique({
            where: {
                id,
            },
        })
    }

    async update(id: string, updateItemDto: Prisma.ItemsUpdateInput) {
        return this.databaseServise.items.update({
            where: {
                id,
            },
            data: updateItemDto,
        })
    }

    async remove(id: string) {
        return this.databaseServise.items.delete({
            where: { id },
        })
    }
}
