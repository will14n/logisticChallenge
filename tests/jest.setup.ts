import supertest from 'supertest';
import { server } from '../src/Server';

jest.setTimeout(10000);

export const testServer = supertest(server);