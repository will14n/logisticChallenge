import { Order } from "../../models";

declare module 'knex/types/tables' {
    interface Tables {
        orders: Order;
        items: Item;
    }
}