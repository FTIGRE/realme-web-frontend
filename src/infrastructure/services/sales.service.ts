import { SaleEntity } from "../../data/entities/sale.entity";
import { ResponseType } from "../../domain/models/types/response.type";
import { PostSaleRequestDataType } from "../../domain/models/types/saleApiData.type";
import { SaleType } from "../../domain/models/types/saleEntity.type";
import { BaseApi } from "../api/base.api";
import { API_BASE_URL, API_SALES_GET_DETAILS_URI, API_SALES_URI } from "../config/env.config";

export class SalesService {
    protected baseApi: BaseApi;

    constructor() {
        this.baseApi = new BaseApi(API_BASE_URL);
    }
    
    async PostSale(sale: PostSaleRequestDataType): Promise<ResponseType<string>> {
        const response = await this.baseApi.doPost<string>(API_SALES_URI,sale);
        return response;
    }

    async GetSales(date: string): Promise<ResponseType<SaleEntity[]>> {
        const response = await this.baseApi.doGet<SaleEntity[]>(API_SALES_URI+API_SALES_GET_DETAILS_URI+date);
        return response;
    }

    async GetSale(id: number): Promise<ResponseType<SaleType[]>> {
        const response = await this.baseApi.doGet<SaleType[]>(API_SALES_URI+id);
        return response;
    }

    async UpdateSale(sale: SaleType): Promise<ResponseType<string>> {
        const response = await this.baseApi.doPost<string>(API_SALES_URI,sale);
        return response;
    }
}