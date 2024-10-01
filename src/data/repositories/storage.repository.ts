import { IStorageRepository } from "../../domain/models/repositories/IStorage.repository";
import { GetDeleteItemRequestDataType, SetItemRequestDataType } from "../../domain/models/types/storageApiDataType";
import { Storageservice } from "../../infrastructure/services/storage.service";
import { StorageType } from "../../shared/enums/storagetype.enum";

export class StorageRepositoryImplementation implements IStorageRepository {

    protected storageService: Storageservice;

    constructor(storageService: Storageservice) {
        this.storageService = storageService;
    }

    setItem(request: SetItemRequestDataType): void {
        this.storageService.setItem(request);
    }
    getItem(request: GetDeleteItemRequestDataType): string | null {
        return this.storageService.getItem(request);
    }
    removeItem(request: GetDeleteItemRequestDataType): void {
        this.storageService.removeItem(request);
    }
    clear(type: StorageType): void {
        this.storageService.clear(type);
    }
}