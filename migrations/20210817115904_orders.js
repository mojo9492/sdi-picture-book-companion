
exports.up = function(knex) {
    return knex.schema.createTable('orders', (table) => {
        table.increments('id');
        table.timestamps(true, true);
        table.integer('item_id').unsigned().notNullable();
        table.foreign('item_id').references('id').inTable('items');
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('id').inTable('users');
        table.integer('quantity');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('orders')
};
