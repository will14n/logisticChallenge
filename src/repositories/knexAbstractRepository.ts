import { Repository } from './repository';
import { Knex } from 'knex';
import { Conn } from '../database/knex';

export abstract class KnexAbstractRepository<T> extends Repository<T> {
    constructor(
        public tableName: string
    ) {
        super();
    }

    public get qb(): Knex.QueryBuilder {
        return Conn(this.tableName);
    }

}