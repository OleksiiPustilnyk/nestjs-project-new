import { ConflictException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateUserDto } from './dto/user.dto'
import { hash } from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateUserDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        })

        if (user) throw new ConflictException('email duplicated')

        const newUser = await this.prisma.user.create({
            data: {
                ...dto,
                password: await hash(dto.password, 10),
            },
        })

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = newUser
        return result
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: {
                email: email,
            },
        })
    }
    async findById(id) {
        return await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        })
    }
}
