export interface IOrder {
    id: string
    order_number: number
    status: string
    total_price: number
    date: string
    item_orders?: [
        {
            id: number
            packaking: string
            price: number
            number_input: string
            number_input_price: number
            text_input: string
            text_input_price: number
            personalization_price: number
            quantity: number
            product: {
                id: number
                title: string
            }
        }
    ]
}
