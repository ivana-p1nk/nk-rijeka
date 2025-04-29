export interface ICoupon {
    code: string
    type: string
    discount: number
    max_uses: number
    times_used: number
    valid_to: string
}
