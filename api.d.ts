interface product {
    product_name: string
    hot_price: number
    iced_price: number
}

interface order {
    product_name: string
    product_type: string
    option?: string
}

interface resultOfOrder {
    product_name: string
    product_type: string
    product_amount: number
    option?: string
    total_price?: number
    created_at? : string
}

interface sumOrder {
    product_name: string
    sum_amount: number
    sum_price: number
    created_at? : string
}


interface sumOption {
    optionBubbke : number
    optionJelly: number
    optionMilk: number
}

type optionName = 'Bubble' | 'Jelly' | 'Milk'