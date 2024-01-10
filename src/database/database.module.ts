import { Module } from '@nestjs/common'
import { DatabaseService } from './database.service'
import { DatabaseResolver } from './database.resolver'

@Module({
    providers: [DatabaseService, DatabaseResolver],
    exports: [DatabaseService],
})
export class DatabaseModule {}
