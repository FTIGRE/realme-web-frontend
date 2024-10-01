import { GetDeleteItemRequestDataType, SetItemRequestDataType } from "../../domain/models/types/storageApiDataType";
import { StorageType } from "../../shared/enums/storagetype.enum";
import { IStorageApiInterface } from "../interfaces/IStorageApi.interface";

export class StorageAPI implements IStorageApiInterface {

    setItem(request: SetItemRequestDataType): void {
        const { key, value, type } = request;
        try {
            type === StorageType.LOCAL ? localStorage.setItem(key, value)
                : sessionStorage.setItem(key, value);
        } catch (error) {
            // console.error(error);
        }
    }
    
    getItem(request: GetDeleteItemRequestDataType): string | null {
        const { key, type } = request;
        try {
            return type === StorageType.LOCAL ? localStorage.getItem(key)
            : sessionStorage.getItem(key);
        } catch (error) {
            // console.error(error);
            return null;
        }
    }
    
    removeItem(request: GetDeleteItemRequestDataType): void {
        const { key, type } = request;
        try {
            type === StorageType.LOCAL ? localStorage.removeItem(key)
            : sessionStorage.removeItem(key);
        } catch (error) {
            // console.error(error);
        }
    }
    
    clear(type: StorageType): void {
        try {
            type === StorageType.LOCAL ? localStorage.clear()
            : sessionStorage.clear();
        } catch (error) {
            // console.error(error);
        }
    }
}