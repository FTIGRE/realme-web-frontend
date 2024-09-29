import { LoginRequestDataType } from "../../domain/models/types/loginApiData.type";
import { ResponseType } from "../../domain/models/types/response.type";
import { BaseApi } from "../api/base.api";

export class AuthService {

    protected baseApi: BaseApi;

    constructor() {
        this.baseApi = new BaseApi("http://3.135.213.77/api/");
    }

    async Login(loginRequestData: LoginRequestDataType): Promise<ResponseType<string>> {
        const response = this.baseApi.doPost<string>('auth/login', loginRequestData);
        return response;
    }
}