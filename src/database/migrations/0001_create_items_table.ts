import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('items', (table) => {
    table.increments('id').primary();
    table.string('type');
    table.integer('length');
    table.integer('width');
    table.integer('height');
    table.integer('weight');
    table.integer('orderId');
    table.timestamps(true, true);
  }).then(() => {
    console.log('Items table created!');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('items').then(() => {
    console.log('Items table deleted!');
  });
}