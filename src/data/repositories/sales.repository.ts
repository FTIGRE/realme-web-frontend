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
    PostSale(sale: PostSaleRequestDataType): Promise<ResponseType<string>> {
        return this.salesService.PostSale(sale);
    }
    GetSales(): Promise<ResponseType<SaleEntity[]>> {
        return this.salesService.GetSales();
    }
    
}
   