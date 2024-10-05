import { ClientEntity } from "../../data/entities/client.entity";
import { SearchClientRequestDataType } from "../../domain/models/types/clientApiData.type";
import { ResponseType } from "../../domain/models/types/response.type";
import { BaseApi } from "../api/base.api";
import { API_BASE_URL, API_CLIENTS_URI } from "../config/env.config";

export class ClientsService {
    protected baseApi: BaseApi;
    constructor() {
        this.baseApi = new BaseApi(API_BASE_URL);
    }
    async SearchClients(request: SearchClientRequestDataType): Promise<ResponseType<ClientEntity[]>> {
        const { column, value } = request;
        const response = await this.baseApi.doGet<ClientEntity[]>(`${API_CLIENTS_URI}${column}/${value}`);
        return response;
    }

    async GetClients(): Promise<ResponseType<ClientEntity[]>> {
        const response = await this.baseApi.doGet<ClientEntity[]>("clientes");
        return response;
    }
    async CreateClient(client: ClientEntity): Promise<ResponseType<string>> {
        const response = await this.baseApi.doPost<string>(API_CLIENTS_URI, client);
        return response;
    }
}