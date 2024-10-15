export type SaleEntityType = {
    id: number;
    client_name: string;
    product_name: string;
    quantity: number;
    method: string;
    total: number;
    debt: number;
}

export type SaleType = {
    id: number;
    client_id: number;
    product_id: number;
    quantity: number;
    p_date: string;
    method: string;
    debt: number;
}