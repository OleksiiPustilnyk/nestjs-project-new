import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
// import { UsersController } from './users/users.controller'
// import { UsersModule } from './users/users.module'
import { ProductsModule } from './products/products.module'
// import { DatabaseModule } from './database/database.module'

// import { DatabaseService } from './database/database.service'
// import { DatabaseResolver } from './database/database.resolver'
// import { TestModule } from './test/test.module'

@Module({
    imports: [ProductsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
