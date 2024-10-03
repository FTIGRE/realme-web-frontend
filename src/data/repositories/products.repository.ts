import { IProductRepository } from "../../domain/models/repositories/IProduct.repository";
import { ResponseType } from "../../domain/models/types/response.type";
import { ProductsService } from "../../infrastructure/services/products.service";
import { ProductEntity } from "../entities/product.entity";

export class ProductsRepositoryImplementation implements IProductRepository {
    protected productsService: ProductsService;

    constructor(productsService: ProductsService) {
        this.productsService = productsService;
    }
    GetProducts(): Promise<ResponseType<ProductEntity[]>> {
        return this.productsService.GetProducts();
    }
    
}
   