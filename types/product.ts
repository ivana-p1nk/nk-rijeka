export interface IProduct {
    id: number;
    title: string;
    price: number;
    quantity: number;
    description: string;
    gallery: string[];
    type_product: string;
    category: {
        id: number;
        title: string;
        image: string;
    },
    variations?: {
        id: number;
        packaging: string;
        price: number;
        minimum_quantity: number;
        gallery?: string[];
    }[];
    orderQuantity?: number;
    related_products?: {
        id: number;
        title: string;
        price: number;
        quantity: number;
        description: string;
        gallery: string[];
        type_product: string;
        category: {
            id: number;
            title: string;
            image: string;
        },
        variations?: {
            id: number;
            packaging: string;
            price: number;
            minimum_quantity: number;
            gallery?: string[];
        }[];
    }[];
}