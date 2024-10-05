import { StorageRepositoryImplementation } from "../../data/repositories/storage.repository";
import { StorageType } from "../../shared/enums/storagetype.enum";
import { GetDeleteItemRequestDataType, SetItemRequestDataType } from "../models/types/storageApiDataType";

export class StorageUseCase {
    protected storageRepositoryImplementation: StorageRepositoryImplementation;

    constructor(storageRepositoryImplementation: StorageRepositoryImplementation) {
        this.storageRepositoryImplementation = storageRepositoryImplementation;
    }
    
    setItem(request: SetItemRequestDataType): void {
        try {
            this.storageRepositoryImplementation.setItem(request);
        } catch (error) {
            // console.error('Error setting item:', error);
        }
    }

    getItem(request: GetDeleteItemRequestDataType): string | null {
        try {
            return this.storageRepositoryImplementation.getItem(request);
        } catch (error) {
            // console.error('Error getting item:', error);
            return null;
        }
    }

    removeItem(request: GetDeleteItemRequestDataType): void {
        try {
            this.storageRepositoryImplementation.removeItem(request);
        } catch (error) {
            // console.error('Error removing item:', error);
        }
    }

    clear(type: StorageType): void {
        try {
            this.storageRepositoryImplementation.clear(type);
        } catch (error) {
            // console.error('Error clearing storage:', error);
        }
    }
}