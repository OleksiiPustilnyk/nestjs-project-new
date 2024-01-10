import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common'
import { ItemsService } from './items.service'
import { Prisma } from '@prisma/client'
import { CreateItemDto } from './dto/create-item.dto'

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Post()
    create(@Body() createItemDto: CreateItemDto) {
        return this.itemsService.create(createItemDto)
    }

    @Get()
    findAll() {
        return this.itemsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.itemsService.findOne(id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateItemDto: Prisma.ItemsUpdateInput,
    ) {
        return this.itemsService.update(id, updateItemDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.itemsService.remove(id)
    }
}
