import { ISellsRepository } from "../../domain/models/repositories/ISells.repository";
import { ResponseType } from "../../domain/models/types/response.type";
import { PostSellRequestDataType } from "../../domain/models/types/sellApiData.type";
import { SellsService } from "../../infrastructure/services/sells.service";

export class SellsRepositoryImplementation implements ISellsRepository {
    protected sellsService: SellsService;

    constructor(sellsService: SellsService) {
        this.sellsService = sellsService;
    }
    PostSell(sell: PostSellRequestDataType): Promise<ResponseType<string>> {
        return this.sellsService.PostSell(sell);
    }
    
}
   