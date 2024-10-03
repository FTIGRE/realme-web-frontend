import { ProductEntityType } from "../../domain/models/types/producEntity.type";

export class ProductEntity {
    public id: number;
    public name: string;
    public price: number;
    public description: string;
    constructor(product: ProductEntityType) {
        const { id, name, price, description } = product;
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
    }
}