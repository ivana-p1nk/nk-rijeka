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
    sku?: string
    type_product: string
    personalization_enable: boolean
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
        quantity: number
        gallery?: string[]
        sku?: string
        personalization_enable: boolean
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
        sku?: string
        type_product: string
        personalization_enable: boolean
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
            sku?: string
        }[]
    }[]
}
