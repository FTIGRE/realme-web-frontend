import { SaleEntity } from "../../data/entities/sale.entity";
import { SalesRepositoryImplementation } from "../../data/repositories/sales.repository";
import { ResponseType } from "../models/types/response.type";
import { PostSaleRequestDataType } from "../models/types/saleApiData.type";
import { SaleType } from "../models/types/saleEntity.type";

export class SalesUseCase {
    protected salesRepositoryImplementation: SalesRepositoryImplementation;

    constructor(salesRepositoryImplementation: SalesRepositoryImplementation) {
        this.salesRepositoryImplementation = salesRepositoryImplementation;
    }

    async PostSale(sale: PostSaleRequestDataType): Promise<ResponseType<string>> {
        try {
            return await this.salesRepositoryImplementation.PostSale(sale);
        } catch (error) {
            return {
                error: true,
                status: 500
            }
        }
    }

    async GetSales(date: string): Promise<ResponseType<SaleEntity[]>> {
        try {
            return await this.salesRepositoryImplementation.GetSales(date);
        } catch (error) {
            return {
                error: true,
                status: 500
            }
        }
    }

    async GetSale(id: number): Promise<ResponseType<SaleType[]>> {
        try {
            return await this.salesRepositoryImplementation.GetSale(id);
        } catch (error) {
            return {
                error: true,
                status: 500
            }
        }
    }

    async UpdateSale(sale: SaleType): Promise<ResponseType<string>> {
        try {
            return await this.salesRepositoryImplementation.UpdateSale(sale);
        } catch (error) {
            return {
                error: true,
                status: 500
            }
        }
    }
}