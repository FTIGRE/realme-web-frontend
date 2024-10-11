import { SellsRepositoryImplementation } from "../../data/repositories/sells.repository";
import { ResponseType } from "../models/types/response.type";
import { PostSellRequestDataType } from "../models/types/sellApiData.type";

export class SellsUseCase {
    protected sellsRepositoryImplementation: SellsRepositoryImplementation;

    constructor(sellsRepositoryImplementation: SellsRepositoryImplementation) {
        this.sellsRepositoryImplementation = sellsRepositoryImplementation;
    }

    async PostSell(sell: PostSellRequestDataType): Promise<ResponseType<string>> {
        try {
            return this.sellsRepositoryImplementation.PostSell(sell);
        } catch (error) {
            return {
                error: true,
                status: 500
            }
        }
    }
}