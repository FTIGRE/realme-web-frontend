import { MembershipEntity } from "../../data/entities/membership.entity";
import { MembershipsRepositoryImplementation } from "../../data/repositories/memberships.repository";
import { ResponseType } from "../models/types/response.type";
import { SearchRequestDataType } from "../models/types/searchApiData.type";

export class MembershipsUseCase {
    protected membershipsRepositoryImplementation: MembershipsRepositoryImplementation;
    constructor(membershipsRepositoryImplementation: MembershipsRepositoryImplementation) {
        this.membershipsRepositoryImplementation = membershipsRepositoryImplementation;
    }
    async getMembership(request: SearchRequestDataType) : Promise<ResponseType<MembershipEntity>> {
        try {
            return await this.membershipsRepositoryImplementation.getMembership(request);
            
        } catch (error) {
            return {
                error: true,
                status: 500
            }
        }
    }
    async createMembership(membership: MembershipEntity) : Promise<ResponseType<string>> {
        try {
            return await this.membershipsRepositoryImplementation.createMembership(membership);
            
        } catch (error) {
            return {
                error: true,
                status: 500
            }
        }
    }
}