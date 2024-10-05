import { ClientEntity } from "../../data/entities/client.entity";
import { SearchClientRequestDataType } from "../../domain/models/types/clientApiData.type";
import { ResponseType } from "../../domain/models/types/response.type";
import { BaseApi } from "../api/base.api";

export class ClientsService {
    protected baseApi: BaseApi;
    constructor() {
        this.baseApi = new BaseApi("http://3.135.213.77/api/");
    }
    async SearchClients(request: SearchClientRequestDataType): Promise<ResponseType<ClientEntity[]>> {
        const { column, value } = request;
        const response = await this.baseApi.doGet<ClientEntity[]>(`clientes/${column}/${value}`);
        return response;
    }

    async GetClients(): Promise<ResponseType<ClientEntity[]>> {
        const response = await this.baseApi.doGet<ClientEntity[]>("clientes");
        return response;
    }
    async CreateClient(client: ClientEntity): Promise<ResponseType<string>> {
        const response = await this.baseApi.doPost<string>("clientes", client);
        return response;
    }
}