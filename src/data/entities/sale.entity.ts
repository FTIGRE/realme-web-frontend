import { SaleEntityType } from "../../domain/models/types/saleEntity.type";

export class SaleEntity {
    public id: number;
    public client_name: string;
    public product_name: string;
    public quantity: number;
    public method: string;
    public total: number;
    public debt: number;
    constructor(sale: SaleEntityType) {
        const { id, client_name, product_name, quantity, method, total, debt } = sale;
        this.id = id;
        this.client_name = client_name;
        this.product_name = product_name;
        this.quantity = quantity;
        this.method = method;
        this.total = total;
        this.debt = debt;
    }
}