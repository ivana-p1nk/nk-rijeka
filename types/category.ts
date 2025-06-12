export interface ICategory {
    id: number;
    title: string;
    slug?: string;
    image?: string;
    products_count: number;
    total_products_count: number;
    description?: string;
    sub_categories?: [
        {
            id: number;
            title: string;
            slug?: string;
            image?: string;
            products_count: number;
        }
    ]
}