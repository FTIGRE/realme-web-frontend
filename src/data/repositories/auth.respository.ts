import { IAuthRepository } from "../../domain/models/repositories/IAuth.repository";
import { LoginRequestDataType } from "../../domain/models/types/loginApiData.type";
import { ResponseType } from "../../domain/models/types/response.type";
import { AuthService } from "../../infrastructure/services/auth.service";

export class AuthRepositoryImplementation implements IAuthRepository {
    protected authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }
    async verifyToken(token: string): Promise<ResponseType<string>> {
        return await this.authService.VerifyToken(token);
    }
    
    async login(loginRequestData: LoginRequestDataType): Promise<any> {
        return await this.authService.Login(loginRequestData);
    }
}