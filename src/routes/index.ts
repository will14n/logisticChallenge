import { Router } from 'express';
import { DefaultValidator } from '../middleware/DefaultValidator';
import { PaginateValidator } from '../middleware/PaginateValidator';
import { OrderController } from '../controllers/order';

const router = Router();
const orderController = new OrderController();

router.get('/', (req, res) => {
    res.json('API ONNN');
});

router.get('/api/orders', PaginateValidator, orderController.index);
router.post('/api/orders', DefaultValidator, orderController.create);
router.get('/api/orders/:id', DefaultValidator, orderController.findOne);
router.put('/api/orders/:id', DefaultValidator, orderController.update);
router.delete('/api/orders/:id', DefaultValidator, orderController.destroy);

export {router};