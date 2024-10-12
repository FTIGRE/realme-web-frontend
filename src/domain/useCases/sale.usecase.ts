import { SaleEntity } from "../../data/entities/sale.entity";
import { SalesRepositoryImplementation } from "../../data/repositories/sales.repository";
import { ResponseType } from "../models/types/response.type";
import { PostSaleRequestDataType } from "../models/types/saleApiData.type";

export class SalesUseCase {
    protected salesRepositoryImplementation: SalesRepositoryImplementation;

    constructor(salesRepositoryImplementation: SalesRepositoryImplementation) {
        this.salesRepositoryImplementation = salesRepositoryImplementation;
    }

    async PostSale(sale: PostSaleRequestDataType): Promise<ResponseType<string>> {
        try {
            return this.salesRepositoryImplementation.PostSale(sale);
        } catch (error) {
            return {
                error: true,
                status: 500
            }
        }
    }

    async GetSales(): Promise<ResponseType<SaleEntity[]>> {
        try {
            return this.salesRepositoryImplementation.GetSales();
        } catch (error) {
            return {
                error: true,
                status: 500
            }
        }
    }
}