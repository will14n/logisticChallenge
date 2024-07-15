import { KnexAbstractRepository } from "./knexAbstractRepository";
import { set, get } from "../redisConfig";

export class knexRepository extends KnexAbstractRepository<any> {

    public async findOne(id: string): Promise<any> {
        const order = await this.qb.where('id', id).first();
        return order;
    }

    public async findAll(): Promise<any> {
        const cache = await get('findAllOrders');
        if(!cache) {
            const order = await this.qb.select('*').orderBy('id', 'desc');
            await set('findAllOrders', JSON.stringify(order));
            return order;
        }
        return JSON.parse(cache);
    }

    public async update(data: any, id: string, field: string = 'id'): Promise<any> {
        const order = await this.qb.where(field, id).update(data).returning('*');
        return order;
    }

    public async delete(id: string, field: string = 'id'): Promise<any> {
        const order = await this.qb.where(field, id).del();
        return order;
    }

    public async create(data: Record<string, any>): Promise<any> {
        const order = await this.qb.insert(data).returning('*');
        return order;
    }
}