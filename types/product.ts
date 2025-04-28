export interface IProduct {
    id: number
    title: string
    price: number
    price_discount?: number
    member_price: number
    minimum_quantity: number
    quantity: number
    description: string
    gallery: string[]
    type_product: string
    category: {
        id: number
        title: string
        image: string
    }
    variations?: {
        id: number
        packaging: string
        price: number
        price_discount?: number
        member_price: number
        minimum_quantity: number
        gallery?: string[]
    }[]
    orderQuantity?: number
    related_products?: {
        id: number
        title: string
        price: number
        price_discount?: number
        minimum_quantity: number
        quantity: number
        description: string
        gallery: string[]
        type_product: string
        category: {
            id: number
            title: string
            image: string
        }
        variations?: {
            id: number
            packaging: string
            price: number
            price_discount?: number
            member_price: number
            minimum_quantity: number
            gallery?: string[]
        }[]
    }[]
}
