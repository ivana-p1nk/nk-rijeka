export interface IUser {
    id: string
    name: string
    email: string
    role?: string
    address?: IAddress
}

export interface IAddress {
    id: string
    user_id: string
    company: string
    state: string
    city: string
    zip: string
    address: string
    phone: string
}
