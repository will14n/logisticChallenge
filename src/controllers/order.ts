import { Request, Response, Router } from 'express';
import { knexRepository } from '../repositories/knexRepository';

export class OrderController {
  public async index(req: Request, res: Response): Promise<void> {
    const result = await new knexRepository('orders').findAll();
    res.status(200).json(result);
  }

  public async create(req: Request, res: Response): Promise<void> {
    const {items, ...orderDetails} = req.body
    const [orderResult] = await new knexRepository('orders').create({
      type: orderDetails.type,
      weight: orderDetails.weight,
      receiverAddress: orderDetails.destination.address,
      receiverName: orderDetails.destination.contactName,
      receiverPhone: orderDetails.destination.contactPhone,
      integrationId: orderDetails.id
    });
    Object.keys(items).forEach(async key => {
      const insertInstance = { ...items[key], orderId: orderResult.id };
      await new knexRepository('items').create(insertInstance);
    });
    res.status(201).json(req.body);
  }

  public async findOne(req: Request, res: Response): Promise<void> {
    const result = await new knexRepository('orders').findOne(req.params.id);
    if(!result) {
      res.status(404).json({ errors: ['Order not found.'] });
    }
    res.status(200).json(result);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const {items, ...orderDetails} = req.body
    const [orderResult] = await new knexRepository('orders').update({
      type: orderDetails.type,
      weight: orderDetails.weight,
      receiverAddress: orderDetails.destination.address,
      receiverName: orderDetails.destination.contactName,
      receiverPhone: orderDetails.destination.contactPhone,
      integrationId: orderDetails.id
    }, req.params.id);
    await new knexRepository('items').delete(orderResult.id, 'orderId');
    Object.keys(items).forEach(async key => {
      const insertInstance = { ...items[key], orderId: orderResult.id };
      await new knexRepository('items').create(insertInstance);
    });
    res.status(200).json(req.body);
  }

  public async destroy(req: Request, res: Response): Promise<void> {
    const result = await new knexRepository('orders').delete(req.params.id);
    if(result === 0) {
      res.status(404).json({ errors: ['Order not found.'] });
    }
    res.status(204).json({});
  }
};
