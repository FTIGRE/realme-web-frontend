import { ProductEntity } from "../../data/entities/product.entity";
import { ResponseType } from "../../domain/models/types/response.type";
import { BaseApi } from "../api/base.api";

export class ProductsService {
    protected baseApi: BaseApi;

    constructor() {
        this.baseApi = new BaseApi("http://3.135.213.77/api/");
    }
    async GetProducts(): Promise<ResponseType<ProductEntity[]>> {
        const response = this.baseApi.doGet<ProductEntity[]>('productos');
        return response;
    }
}