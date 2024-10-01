import { StorageType } from "../../../shared/enums/storagetype.enum";

export type SetItemRequestDataType = {
    key: string;
    value: string;
    type: StorageType;
}

export type GetDeleteItemRequestDataType = {
    key: string;
    type: StorageType;
}