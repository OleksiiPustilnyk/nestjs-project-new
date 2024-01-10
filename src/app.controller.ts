import { Body, Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { CreateProductDto } from './products/dto/create-product.dto'

@Controller('app')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }

    @Post('create')
    async create(@Body() dto: CreateProductDto) {
        const res = await this.appService.save(dto)
        return res
    }
}
