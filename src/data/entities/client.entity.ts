import { ClientEntityType } from "../../domain/models/types/clientEntity.type";

export class ClientEntity {
    public id: number;
    public name: string;
    public ic: number;
    public BDate: string;
    public state?: string;

    constructor(client: ClientEntityType) {
        const { id, name, ic, BDate, state } = client;
        this.id = id;
        this.name = name;
        this.ic = ic;
        this.BDate = BDate;
        this.state = state;
    }
}