import knex from 'knex';
import { development, production, test } from './Environment';

const getEnvironment = () => {
    const env = process.env.NODE_ENV;
    switch (env) {
        case 'development':
            return development;
        case 'test':
            return test;
        default:
            return production;
    }
}

export const Conn = knex(getEnvironment());