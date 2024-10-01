import { GetDeleteItemRequestDataType, SetItemRequestDataType } from "../../domain/models/types/storageApiDataType";
import { StorageType } from "../../shared/enums/storagetype.enum";

export interface IStorageApiInterface {
    setItem(request: SetItemRequestDataType): void;
    getItem(request: GetDeleteItemRequestDataType): string | null;
    removeItem(request: GetDeleteItemRequestDataType): void;
    clear(type: StorageType): void;
}