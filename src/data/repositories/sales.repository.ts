import { ISalesRepository } from "../../domain/models/repositories/ISales.repository";
import { ResponseType } from "../../domain/models/types/response.type";
import { PostSaleRequestDataType } from "../../domain/models/types/saleApiData.type";
import { SaleType } from "../../domain/models/types/saleEntity.type";
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

    async GetSale(id: number): Promise<ResponseType<SaleType[]>> {
        return await this.salesService.GetSale(id);
    }

    async UpdateSale(sale: SaleType): Promise<ResponseType<string>> {
        return await this.salesService.UpdateSale(sale);
    }
    
}
   