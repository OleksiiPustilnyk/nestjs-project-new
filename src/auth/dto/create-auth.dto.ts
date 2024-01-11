import { createZodDto } from 'nestjs-zod'

import { AuthSchema } from '../entities/auth.entity'

export class AuthDto extends createZodDto(AuthSchema) {}
