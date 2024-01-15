import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { ItemsModule } from './items/items.module'
import { DatabaseModule } from './database/database.module'
// import { AddressModule } from './address/address.module'
import { UsersModule } from './users/users.module'
import { APP_PIPE } from '@nestjs/core'
import { ZodValidationPipe } from 'nestjs-zod'
import { AuthModule } from './auth/auth.module'
import { TokenModule } from './token/token.module'

@Module({
    imports: [
        DatabaseModule,
        ItemsModule,
        // AddressModule,
        UsersModule,
        AuthModule,
        TokenModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_PIPE,
            useClass: ZodValidationPipe,
        },
    ],
})
export class AppModule {}
