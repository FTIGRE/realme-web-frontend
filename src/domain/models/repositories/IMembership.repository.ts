import { MembershipEntity } from "../../../data/entities/membership.entity";
import { ResponseType } from "../types/response.type";
import { SearchRequestDataType } from "../types/searchApiData.type";

export interface IMembershipsRepository {
    getMembership(request: SearchRequestDataType): Promise<ResponseType<MembershipEntity>>;
    createMembership(membership: MembershipEntity): Promise<ResponseType<string>>;
}