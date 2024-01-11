import { Injectable } from '@nestjs/common'

import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class AddressService {
    constructor(private databaseService: DatabaseService) {}

    create(createAddressDto: CreateAddressDto) {
        return this.databaseService.address.create({
            data: createAddressDto,
        })
    }

    findAll() {
        return this.databaseService.address.findMany()
    }

    findOne(id: string) {
        return this.databaseService.address.findUnique({ where: { id } })
    }

    async update(id: string, updateAddressDto: UpdateAddressDto) {
        return this.databaseService.address.update({
            where: {
                id,
            },
            data: updateAddressDto,
        })
    }

    async remove(id: string) {
        return this.databaseService.address.delete({ where: { id } })
    }
}
