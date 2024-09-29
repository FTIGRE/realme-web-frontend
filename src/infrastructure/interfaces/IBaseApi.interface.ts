import { ResponseType } from "../../domain/models/types/response.type";

export interface IBaseApiInterface {
    doGet<T>(url: string): Promise<ResponseType<T>>;
    doPost<T>(url: string, data: any): Promise<ResponseType<T>>;
    doPut<T>(url: string, data: any): Promise<ResponseType<T>>;
    doDelete<T>(url: string): Promise<ResponseType<T>>;
}