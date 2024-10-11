import { ResponseType } from "../../domain/models/types/response.type";
import { PostSellRequestDataType } from "../../domain/models/types/sellApiData.type";
import { BaseApi } from "../api/base.api";
import { API_BASE_URL, API_SELLS_URI } from "../config/env.config";

export class SellsService {
    protected baseApi: BaseApi;

    constructor() {
        this.baseApi = new BaseApi(API_BASE_URL);
    }
    async PostSell(sell: PostSellRequestDataType): Promise<ResponseType<string>> {
        const response = this.baseApi.doPost<string>(API_SELLS_URI,sell);
        return response;
    }
}