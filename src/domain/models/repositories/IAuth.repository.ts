import { LoginRequestDataType } from "../types/loginApiData.type";
import { ResponseType } from "../types/response.type";

export interface IAuthRepository {
    login(loginRequestData: LoginRequestDataType): Promise<ResponseType<string>>;
}