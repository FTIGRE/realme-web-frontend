import { SaleEntity } from "../../data/entities/sale.entity";
import { ResponseType } from "../../domain/models/types/response.type";
import { PostSaleRequestDataType } from "../../domain/models/types/saleApiData.type";
import { BaseApi } from "../api/base.api";
import { API_BASE_URL, API_SALES_GET_DETAILS_URI, API_SALES_URI } from "../config/env.config";

export class SalesService {
    protected baseApi: BaseApi;

    constructor() {
        this.baseApi = new BaseApi(API_BASE_URL);
    }
    
    async PostSale(sale: PostSaleRequestDataType): Promise<ResponseType<string>> {
        const response = this.baseApi.doPost<string>(API_SALES_URI,sale);
        return response;
    }

    async GetSales(): Promise<ResponseType<SaleEntity[]>> {
        const response = this.baseApi.doGet<SaleEntity[]>(API_SALES_URI+API_SALES_GET_DETAILS_URI);
        return response;
    }
}