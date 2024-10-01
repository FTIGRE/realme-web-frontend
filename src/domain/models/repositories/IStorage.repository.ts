import { StorageType } from "../../../shared/enums/storagetype.enum";
import { GetDeleteItemRequestDataType, SetItemRequestDataType } from "../types/storageApiDataType";

export interface IStorageRepository {
    setItem(request: SetItemRequestDataType): void;
    getItem(request: GetDeleteItemRequestDataType): string | null;
    removeItem(request: GetDeleteItemRequestDataType): void;
    clear(type: StorageType): void;
}