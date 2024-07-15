import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

jest.setTimeout(10000);
describe('Orders', () => {
  describe('Create', () => {
    it('Should create an order', async () => {
      const order = await testServer.post('/api/orders').send({
        type: 'order',
        weight: 100,
        destination: {
          address: 'address',
          contactName: 'contactName',
          contactPhone: 'contactPhone'
        },
        items: [
          {
            type: 'item',
            length: 10,
            width: 10,
            height: 10,
            weight: 10
          }
        ]
      });
      expect(order.status).toBe(StatusCodes.CREATED);
      expect(order.body).toHaveProperty('type');
    });
    it('Should return 400 if type body param is not a string', async () => {
      const order = await testServer.post('/api/orders').send({
        type: false,
        weight: 100,
        destination: {
          address: 'address',
          contactName: 'contactName',
          contactPhone: 'contactPhone'
        },
        items: [
          {
            type: 'item',
            length: 10,
            width: 10,
            height: 10,
            weight: 10
          }
        ]
      });
      expect(order.status).toBe(StatusCodes.BAD_REQUEST);
      expect(order.body).toEqual({ errors: ['type needs to be a string.'] });
    });
    it('Should return 400 if weight body param is not a number', async () => {
      const order = await testServer.post('/api/orders').send({
        type: 'order',
        weight: {},
        destination: {
          address: 'address',
          contactName: 'contactName',
          contactPhone: 'contactPhone'
        },
        items: [
          {
            type: 'item',
            length: 10,
            width: 10,
            height: 10,
            weight: 10
          }
        ]
      });
      expect(order.status).toBe(StatusCodes.BAD_REQUEST);
    });
    it('Should return 400 if no body param', async () => {
      const order = await testServer.post('/api/orders');
      expect(order.status).toBe(StatusCodes.BAD_REQUEST);
      expect(order.body).toEqual({ errors: ['items is required in the body.'] });
    });
  });
  describe('List', () => {


    it('Should return 404 if Order does not exist', async () => {
      const order = await testServer.get('/api/orders/99999');
      expect(order.status).toBe(StatusCodes.NOT_FOUND);
      expect(order.body).toEqual({ errors: ['Order not found.'] });
    });

  });
  describe('Update', () => {
    it('Should update an order', async () => {
      const order = await testServer.put('/api/orders/1').send({
        type: 'order',
        weight: 100,
        destination: {
          address: 'address',
          contactName: 'contactName',
          contactPhone: 'contactPhone'
        },
        items: [
          {
            type: 'item',
            length: 10,
            width: 10,
            height: 10,
            weight: 10
          }
        ]
      });
      expect(order.status).toBe(StatusCodes.OK);
      expect(order.body).toHaveProperty('type');
    });
    it('Should return 400 if type body param is not a string', async () => {
      const order = await testServer.put('/api/orders/1').send({
        type: false,
        weight: 100,
        destination: {
          address: 'address',
          contactName: 'contactName',
          contactPhone: 'contactPhone'
        },
        items: [
          {
            type: 'item',
            length: 10,
            width: 10,
            height: 10,
            weight: 10
          }
        ]
      });
      expect(order.status).toBe(StatusCodes.BAD_REQUEST);
      expect(order.body).toEqual({ errors: ['type needs to be a string.'] });
    });
    it('Should return 400 if weight body param is not a number', async () => {
      const order = await testServer.put('/api/orders/1').send({
        type: 'order',
        weight: {},
        destination: {
          address: 'address',
          contactName: 'contactName',
          contactPhone: 'contactPhone'
        },
        items: [
          {
            type: 'item',
            length: 10,
            width: 10,
            height: 10,
            weight: 10
          }
        ]
      });
      expect(order.status).toBe(StatusCodes.BAD_REQUEST);
    });
    it('Should return 400 if no body param', async () => {
      const order = await testServer.put('/api/orders/1');
      expect(order.status).toBe(StatusCodes.BAD_REQUEST);
      expect(order.body).toEqual({ errors: ['items is required in the body.'] });
    });
  });
  it('Should return 404 if Order does not exist', async () => {
    const order = await testServer.delete('/api/orders/99999');
    expect(order.status).toBe(StatusCodes.NOT_FOUND);
    expect(order.body).toEqual({ errors: ['Order not found.'] });
  });
});