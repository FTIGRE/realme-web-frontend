import { ClientEntity } from "../../data/entities/client.entity";
import { ClientsRepositoryImplementation } from "../../data/repositories/clients.repository";
import { SearchRequestDataType } from "../models/types/searchApiData.type";
import { ResponseType } from "../models/types/response.type";

export class ClientsUseCase {
    protected clientsRepositoryImplementation: ClientsRepositoryImplementation
    constructor(clientsRepositoryImplementation: ClientsRepositoryImplementation) {
        this.clientsRepositoryImplementation = clientsRepositoryImplementation
    }

    async SearchClients(request: SearchRequestDataType): Promise<ResponseType<ClientEntity[]>> {
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

    async GetClientsMemberships(state: string): Promise<ResponseType<ClientEntity[]>> {
        try {
            return await this.clientsRepositoryImplementation.GetClientsMemberships(state)
        } catch (error) {
            return {
                error: true,
                status: 500
            }
        }
    }
}