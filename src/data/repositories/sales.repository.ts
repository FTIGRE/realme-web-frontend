import { ISalesRepository } from "../../domain/models/repositories/ISales.repository";
import { ResponseType } from "../../domain/models/types/response.type";
import { PostSaleRequestDataType } from "../../domain/models/types/saleApiData.type";
import { SalesService } from "../../infrastructure/services/sales.service";
import { SaleEntity } from "../entities/sale.entity";

export class SalesRepositoryImplementation implements ISalesRepository {
    protected salesService: SalesService;

    constructor(salesService: SalesService) {
        this.salesService = salesService;
    }
    async PostSale(sale: PostSaleRequestDataType): Promise<ResponseType<string>> {
        return await this.salesService.PostSale(sale);
    }
    async GetSales(date: string): Promise<ResponseType<SaleEntity[]>> {
        return await this.salesService.GetSales(date);
    }
    
}
   