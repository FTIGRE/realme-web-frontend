export type ResponseType<T> = {
    error: boolean;
    status: number;
    body?: T
}