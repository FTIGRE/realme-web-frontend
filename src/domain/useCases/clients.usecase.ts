import { ClientEntity } from "../../data/entities/client.entity";
import { ClientsRepositoryImplementation } from "../../data/repositories/clients.repository";
import { SearchClientRequestDataType } from "../models/types/clientApiData.type";
import { ResponseType } from "../models/types/response.type";

export class ClientsUseCase {
    protected clientsRepositoryImplementation: ClientsRepositoryImplementation
    constructor(clientsRepositoryImplementation: ClientsRepositoryImplementation) {
        this.clientsRepositoryImplementation = clientsRepositoryImplementation
    }

    async SearchClients(request: SearchClientRequestDataType): Promise<ResponseType<ClientEntity[]>> {
        try {
            return await this.clientsRepositoryImplementation.SearchClients(request)
        } catch (error) {
            return {
                error: true,
                status: 500
            }
        }
    }

    async GetClients(): Promise<ResponseType<ClientEntity[]>> {
        try {
            return await this.clientsRepositoryImplementation.GetClients()
        } catch (error) {
            return {
                error: true,
                status: 500
            }
        }
    }

    async CreateClient(client: ClientEntity): Promise<ResponseType<string>> {
        try {
            return await this.clientsRepositoryImplementation.CreateClient(client)
        } catch (error) {
            return {
                error: true,
                status: 500
            }
        }
    }
}