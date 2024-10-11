import { ResponseType } from "../types/response.type";
import { PostSellRequestDataType } from "../types/sellApiData.type";

export interface ISellsRepository {
    PostSell(sell: PostSellRequestDataType): Promise<ResponseType<string>>;
}