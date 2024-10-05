import { ProductEntity } from "../../data/entities/product.entity";
import { ResponseType } from "../../domain/models/types/response.type";
import { BaseApi } from "../api/base.api";
import { API_BASE_URL, API_PRODUCTS_URI } from "../config/env.config";

export class ProductsService {
    protected baseApi: BaseApi;

    constructor() {
        this.baseApi = new BaseApi(API_BASE_URL);
    }
    async GetProducts(): Promise<ResponseType<ProductEntity[]>> {
        const response = this.baseApi.doGet<ProductEntity[]>(API_PRODUCTS_URI);
        return response;
    }

    async CreateProduct(product: ProductEntity): Promise<ResponseType<string>> {
        const response = this.baseApi.doPost<string>(API_PRODUCTS_URI, product);
        return response;
    }
}