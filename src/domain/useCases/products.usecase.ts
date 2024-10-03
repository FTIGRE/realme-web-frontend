import { ProductEntity } from "../../data/entities/product.entity";
import { ProductsRepositoryImplementation } from "../../data/repositories/products.repository";
import { ResponseType } from "../models/types/response.type";

export class ProductsUseCase {
    protected productsRepositoryImplementation: ProductsRepositoryImplementation;

    constructor(productsRepositoryImplementation: ProductsRepositoryImplementation) {
        this.productsRepositoryImplementation = productsRepositoryImplementation;
    }

    async GetProducts(): Promise<ResponseType<ProductEntity[]>> {
        try {
            return this.productsRepositoryImplementation.GetProducts();
        } catch (error) {
            return {
                error: true,
                status: 500
            }
        }
    }
}