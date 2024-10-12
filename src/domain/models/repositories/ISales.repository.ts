import { SaleEntity } from "../../../data/entities/sale.entity";
import { ResponseType } from "../types/response.type";
import { PostSaleRequestDataType } from "../types/saleApiData.type";

export interface ISalesRepository {
    PostSale(sale: PostSaleRequestDataType): Promise<ResponseType<string>>;
    GetSales(): Promise<ResponseType<SaleEntity[]>>;
}