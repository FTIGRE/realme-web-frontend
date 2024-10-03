import { ClientEntity } from "../../../data/entities/client.entity";
import { SearchClientRequestDataType } from "../types/clientApiData.type";
import { ResponseType } from "../types/response.type";

export interface IClientRepository {
    SearchClients(request: SearchClientRequestDataType): Promise<ResponseType<ClientEntity[]>>;
}