export interface BaseRepository<T> {
    create(data: Record<string, any>): Promise<T[]>;
    findOne(id: string): Promise<T>;
    findAll(): Promise<T>;
    update(data: Record<string, any>, id: string, field: string): Promise<T>;
    delete(id: string, field: string): Promise<T>;
}