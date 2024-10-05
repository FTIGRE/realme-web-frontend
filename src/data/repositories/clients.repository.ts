import { IClientRepository } from "../../domain/models/repositories/IClient.repository";
import { SearchClientRequestDataType } from "../../domain/models/types/clientApiData.type";
import { ResponseType } from "../../domain/models/types/response.type";
import { ClientsService } from "../../infrastructure/services/clients.service";
import { ClientEntity } from "../entities/client.entity";

export class ClientsRepositoryImplementation implements IClientRepository {
    protected clientsService: ClientsService;
    constructor(clientsService: ClientsService) {
        this.clientsService = clientsService;
    }
    async SearchClients(request: SearchClientRequestDataType): Promise<ResponseType<ClientEntity[]>> {
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
}