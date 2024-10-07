import { IMembershipsRepository } from "../../domain/models/repositories/IMembership.repository";
import { ResponseType } from "../../domain/models/types/response.type";
import { SearchRequestDataType } from "../../domain/models/types/searchApiData.type";
import { MembershipsService } from "../../infrastructure/services/memberships.service";
import { MembershipEntity } from "../entities/membership.entity";

export class MembershipsRepositoryImplementation implements IMembershipsRepository {
    protected membershipsService: MembershipsService;
    constructor(membershipsService: MembershipsService) {
        this.membershipsService = membershipsService;
    }
    async getMembership(request: SearchRequestDataType) : Promise<ResponseType<MembershipEntity>> {
        const response = await this.membershipsService.getMembership(request);

        return {
            error: response.error,
            status: response.status,
            body: response.body?.at(0)
        };
    }
    async createMembership(membership: MembershipEntity) : Promise<ResponseType<string>> {
        const response = await this.membershipsService.createMembership(membership);

        return {
            error: response.error,
            status: response.status,
            body: response.body
        };
    }
}