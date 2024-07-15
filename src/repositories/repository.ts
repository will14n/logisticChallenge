import { BaseRepository } from ".";

export abstract class Repository<T> implements BaseRepository<T> {
    public abstract create(data: Record<string, any>): Promise<T[]>;
    public abstract findOne(id: string): Promise<T>;
    public abstract findAll(): Promise<T>;
    public abstract update(data: Record<string, any>, id: string): Promise<T>;
    public abstract delete(id: string): Promise<T>;
}