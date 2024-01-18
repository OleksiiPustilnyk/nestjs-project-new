import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    // app.enableCors({
    //     origin: 'http://localhost:3000',
    //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //     credentials: true,
    // })

    const corsOptions: CorsOptions = {
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    }
    app.enableCors(corsOptions)

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    )
    await app.listen(8000)
}
bootstrap()
