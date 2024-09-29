import { IAuthRepository } from "../../domain/models/repositories/IAuth.repository";
import { LoginRequestDataType } from "../../domain/models/types/loginApiData.type";
import { AuthService } from "../../infrastructure/services/auth.service";

export class AuthRepositoryImplementation implements IAuthRepository {
    protected authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }
    
    async login(loginRequestData: LoginRequestDataType): Promise<any> {
        return await this.authService.Login(loginRequestData);
    }
}