import { ClientEntity } from "../../../data/entities/client.entity";
import { SearchRequestDataType } from "../types/searchApiData.type";
import { ResponseType } from "../types/response.type";

export interface IClientRepository {
    SearchClients(request: SearchRequestDataType): Promise<ResponseType<ClientEntity[]>>;
    GetClients(): Promise<ResponseType<ClientEntity[]>>;
    CreateClient(client: ClientEntity): Promise<ResponseType<string>>;
    GetClientsMemberships(state: string): Promise<ResponseType<ClientEntity[]>>;
}