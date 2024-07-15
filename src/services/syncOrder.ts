import * as HTTPUtil from '../../src/util/request';
import { knexRepository } from '../repositories/knexRepository';

interface Pickup {
  address: string;
  contactName: string;
  contactPhone: string;
}

interface OrderDestination {
  address: string;
  contactName: string;
  contactPhone: string;
}

interface OrderItems {
  type: string;
  length: number;
  width: number;
  height: number;
  weight: number;
}

export interface OrderShipmentResponse {
  id: string;
  type: string;
  weight: number | null;
  pickup: Pickup;
  destination: OrderDestination;
  items: OrderItems[];
}

export interface OrderShipmentNormalized {
  id: string;
  type: string;
  weight: number | null;
  destination: OrderDestination;
  items: OrderItems[];
}

export class SyncOrderService {
  constructor(protected request = new HTTPUtil.Request()) {}
  public async fetchOrders()  {
    try {
      const response = await this.request.get<OrderShipmentResponse[]>('https://stoplight.io/mocks/quicargolog/logistic-tech/11450134/api/orders');
      this.saveOrders(response.data);
      return response;
    } catch (error) {
      if(error instanceof Error) {
        throw new Error(`Unexpected error when trying to fetch orders api: ${error.message}`);
      }
    }
  }

  private async saveOrders(orders: OrderShipmentResponse[]) {
    orders.map( async(order) => {
      const { items, pickup, ...orderDetails } = order;
      const [orderResult] = await new knexRepository('orders').create({
        type: orderDetails.type,
        weight: orderDetails.weight,
        receiverAddress: orderDetails.destination.address,
        receiverName: orderDetails.destination.contactName,
        receiverPhone: orderDetails.destination.contactPhone,
        integrationId: orderDetails.id
      });
      for (let item of items) {
        const insertInstance: any = { ...item, orderId: orderResult.id };
        const itemResult = await new knexRepository('items').create(insertInstance);
      }
    });
  }
}