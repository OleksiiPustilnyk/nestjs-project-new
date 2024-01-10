export class CreateItemDto {
    name: string
    description: string
    price: number
    isOnSale: boolean
    tags?: string[]
    reviews?: CreateReviewDto
    availability: 'IN_STORE' | 'ONLINE'
}

export class CreateReviewDto {
    title: string
    content: string
    rating: number
}
