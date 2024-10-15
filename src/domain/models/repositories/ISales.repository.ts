import { SaleEntity } from "../../../data/entities/sale.entity";
import { ResponseType } from "../types/response.type";
import { PostSaleRequestDataType } from "../types/saleApiData.type";
import { SaleType } from "../types/saleEntity.type";

export interface ISalesRepository {
    PostSale(sale: PostSaleRequestDataType): Promise<ResponseType<string>>;
    GetSales(date: string): Promise<ResponseType<SaleEntity[]>>;
    GetSale(id: number): Promise<ResponseType<SaleType[]>>;
    UpdateSale(sale: SaleType): Promise<ResponseType<string>>;
}