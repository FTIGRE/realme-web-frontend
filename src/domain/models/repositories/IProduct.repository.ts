import { ProductEntity } from "../../../data/entities/product.entity";
import { ResponseType } from "../types/response.type";

export interface IProductRepository {
    GetProducts(): Promise<ResponseType<ProductEntity[]>>;
}