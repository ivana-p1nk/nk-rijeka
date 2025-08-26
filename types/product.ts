export interface IProduct {
    id: number
    title: string
    price: number
    price_discount?: number
    member_price: number
    minimum_quantity: number
    quantity: number
    quantity_sum: number
    description: string
    gallery: string[]
    sku?: string
    type_product: string
    personalization_enable: boolean
    personalization_name?: boolean
    personalization_number?: boolean
    personalization_logo?: boolean
    category: {
        id: number
        title: string
        slug: string
        image: string | null
        children?: {
            id: number
            title: string
            slug: string
            image: string | null
        }[]
    }[]
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
        personalization_name?: boolean
        personalization_number?: boolean
        personalization_logo?: boolean
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
