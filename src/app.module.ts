import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { ItemsModule } from './items/items.module'
import { DatabaseModule } from './database/database.module'
import { AddressModule } from './address/address.module';

@Module({
    imports: [DatabaseModule, ItemsModule, AddressModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
