import { MembershipEntityType } from "../../domain/models/types/membershipEntity.type";

export class MembershipEntity {
    id: number;
    client_id: number;
    start_date: string;
    end_date: string;
    state: string;
    constructor(membership: MembershipEntityType) {
        const { id, client_id, start_date, end_date, state } = membership;
        this.id = id;
        this.client_id = client_id;
        this.start_date = start_date;
        this.end_date = end_date;
        this.state = state;
    }
}