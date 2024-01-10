import { Prisma } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { CreateItemDto } from './dto/create-item.dto'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class ItemsService {
    constructor(private readonly databaseService: DatabaseService) {}
    async create(createItemDto: CreateItemDto) {
        const { tags, reviews, ...item } = createItemDto

        return this.databaseService.items.create({
            data: {
                ...item,
                ...(tags && { tags: tags }),
                ...(reviews && {
                    reviews: {
                        createMany: {
                            data: reviews,
                        },
                    },
                }),
            },
        })
    }

    async findAll() {
        return this.databaseService.items.findMany({
            include: { reviews: true },
        })
    }

    async findOne(id: string) {
        return this.databaseService.items.findUnique({
            where: {
                id,
            },
            include: { reviews: true },
        })
    }

    async update(id: string, updateItemDto: Prisma.ItemsUpdateInput) {
        return this.databaseService.items.update({
            where: {
                id,
            },
            data: updateItemDto,
        })
    }

    async remove(id: string) {
        return this.databaseService.items.delete({
            where: { id },
        })
    }
}
