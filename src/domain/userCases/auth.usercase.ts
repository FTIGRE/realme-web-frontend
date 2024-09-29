import { AuthRepositoryImplementation } from "../../data/repositories/auth.respository";
import { LoginRequestDataType } from "../models/types/loginApiData.type";
import { ResponseType } from "../models/types/response.type";

export class AuthUserCase {
    protected authRepositoryImplementation: AuthRepositoryImplementation;

    constructor(authRepositoryImplementation: AuthRepositoryImplementation) {
        this.authRepositoryImplementation = authRepositoryImplementation;
    }

    async login(loginRequestData: LoginRequestDataType): Promise<ResponseType<string>> {
        try {
            return await this.authRepositoryImplementation.login(loginRequestData);
        } catch (error) {
            return {
                error: true,
                status: 500
            }
        }
    }
}