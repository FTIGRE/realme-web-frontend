import { LoginRequestDataType } from "../../domain/models/types/loginApiData.type";
import { ResponseType } from "../../domain/models/types/response.type";
import { BaseApi } from "../api/base.api";
import { API_AUTH_URI, API_BASE_URL } from "../config/env.config";

export class AuthService {

    protected baseApi: BaseApi;

    constructor() {
        this.baseApi = new BaseApi(API_BASE_URL);
    }

    async Login(loginRequestData: LoginRequestDataType): Promise<ResponseType<string>> {
        const response = this.baseApi.doPost<string>(`${API_AUTH_URI}login`, loginRequestData);
        return response;
    }

    async VerifyToken(token: string): Promise<ResponseType<string>> {
        const response = this.baseApi.doPost<string>(`${API_AUTH_URI}verifyJWT`, { token: token });
        return response;
    }
}