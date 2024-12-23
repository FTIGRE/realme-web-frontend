import { IClientRepository } from "../../domain/models/repositories/IClient.repository";
import { SearchRequestDataType } from "../../domain/models/types/searchApiData.type";
import { ResponseType } from "../../domain/models/types/response.type";
import { ClientsService } from "../../infrastructure/services/clients.service";
import { ClientEntity } from "../entities/client.entity";

export class ClientsRepositoryImplementation implements IClientRepository {
    protected clientsService: ClientsService;
    constructor(clientsService: ClientsService) {
        this.clientsService = clientsService;
    }
    async SearchClients(request: SearchRequestDataType): Promise<ResponseType<ClientEntity[]>> {
        const response = await this.clientsService.SearchClients(request);
        return response;
    }
    async GetClients(): Promise<ResponseType<ClientEntity[]>> {
        const response = await this.clientsService.GetClients();
        return response;
    }
    async CreateClient(client: ClientEntity): Promise<ResponseType<string>> {
        const response = await this.clientsService.CreateClient(client);
        return response;
    }
    async GetClientsMemberships(state: string): Promise<ResponseType<ClientEntity[]>> {
        const response = await this.clientsService.GetClientsMemberships(state);
        return response;
    }
}