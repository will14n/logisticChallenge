import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('orders', table => {
    table.increments('id').primary();
    table.string('type');
    table.double('weight').nullable();
    table.string('receiverAddress');
    table.string('receiverName');
    table.string('receiverPhone');
    table.string('integrationId');
    table.timestamps(true, true);
  }).then(() => {
    console.log('Orders table created!');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('orders').then(() => {
    console.log('Orders table deleted!');
  });
}