import { Injectable } from '@nestjs/common'

import { DatabaseService } from './database/database.service'

@Injectable()
export class AppService {
    constructor(private readonly databaseServise: DatabaseService) {}
    getHello(): string {
        return 'Hello World!'
    }
}
