import { Knex } from "knex";
import path from "path";

export const development: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, '../dev.sqlite')  
    },
    useNullAsDefault: true,
    debug: true,
    migrations: {
        directory: path.resolve(__dirname, '../migrations'),
    },
    seeds: {
        directory: path.resolve(__dirname, '../seeds'),
    },
    pool: {
        afterCreate: (conn: any, done: Function) => {
            conn.run('PRAGMA foreign_keys = ON');
            done();
        }
    }
}

export const production: Knex.Config = {
    ...development,
}

export const test: Knex.Config = {
    ...development,
}