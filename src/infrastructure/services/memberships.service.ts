import { MembershipEntity } from "../../data/entities/membership.entity";
import { ResponseType } from "../../domain/models/types/response.type";
import { SearchRequestDataType } from "../../domain/models/types/searchApiData.type";
import { BaseApi } from "../api/base.api";
import { API_BASE_URL, API_MEMBERSHIPS_URI } from "../config/env.config";

export class MembershipsService {
    protected baseApi: BaseApi;

    constructor() {
        this.baseApi = new BaseApi(API_BASE_URL);
    }

    async getMembership(request: SearchRequestDataType) : Promise<ResponseType<MembershipEntity[]>> {
        const { column, value } = request;
        const searchIdentifier = `${column}/${value}`;
        const response = await this.baseApi.doGet<MembershipEntity[]>(API_MEMBERSHIPS_URI+searchIdentifier);
        return response;
    }

    async createMembership(membership: MembershipEntity) : Promise<ResponseType<string>> {
        const response = await this.baseApi.doPost<string>(API_MEMBERSHIPS_URI, membership);
        return response;
    }

}