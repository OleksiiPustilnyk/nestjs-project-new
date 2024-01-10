import { Injectable } from '@nestjs/common'
import { CreateProductDto } from './products/dto/create-product.dto'
import { DatabaseService } from './database/database.service'

@Injectable()
export class AppService {
    constructor(private readonly databaseServise: DatabaseService) {}
    getHello(): string {
        return 'Hello World!'
    }

    async save(dto: CreateProductDto) {
        return this.databaseServise.product.create({
            data: dto,
        })
    }
}
