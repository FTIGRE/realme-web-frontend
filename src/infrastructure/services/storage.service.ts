import { GetDeleteItemRequestDataType, SetItemRequestDataType } from "../../domain/models/types/storageApiDataType";
import { StorageType } from "../../shared/enums/storagetype.enum";
import { StorageAPI } from "../api/storage.api";

export class Storageservice {
    protected storageApi: StorageAPI;

    constructor() {
        this.storageApi = new StorageAPI();
    }

    setItem(request: SetItemRequestDataType): void {
        this.storageApi.setItem(request);
    }

    getItem(request: GetDeleteItemRequestDataType): string | null {
        return this.storageApi.getItem(request);
    }

    removeItem(request: GetDeleteItemRequestDataType): void {
        this.storageApi.removeItem(request);
    }

    clear(type: StorageType): void {
        this.storageApi.clear(type);
    }
}