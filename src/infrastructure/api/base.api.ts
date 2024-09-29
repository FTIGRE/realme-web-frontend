import { ResponseType } from "../../domain/models/types/response.type";
import { IBaseApiInterface } from "../interfaces/IBaseApi.interface";

export class BaseApi implements IBaseApiInterface {
    protected baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async doGet<T>(uri: string): Promise<ResponseType<T>> {
        try {
            const response = await fetch(this.baseUrl + uri);
            return response.json();
        } catch (error) {
            return {
                error: true,
                status: 500
            };
        }
    }

    async doPost<T>(uri: string, data: any): Promise<ResponseType<T>> {
        try {
            const response = await fetch(this.baseUrl + uri, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.json();
        } catch (error) {
            return {
                error: true,
                status: 500
            };
        }
    }

    async doPut<T>(uri: string, data: any): Promise<ResponseType<T>> {
        try {
            const response = await fetch(this.baseUrl + uri, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.json();
        } catch (error) {
            return {
                error: true,
                status: 500
            };
            
        }
    }

    async doDelete<T>(uri: string): Promise<ResponseType<T>> {
        try {
            const response = await fetch(this.baseUrl + uri, {
                method: 'DELETE'
            });
            return response.json();
        } catch (error) {
            return {
                error: true,
                status: 500
            };
        }
    }
}