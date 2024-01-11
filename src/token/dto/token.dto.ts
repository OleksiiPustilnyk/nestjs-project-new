import { createZodDto } from 'nestjs-zod'

import { TokenSchema } from '../entities/token.entity'

export class TokenDto extends createZodDto(TokenSchema) {}
