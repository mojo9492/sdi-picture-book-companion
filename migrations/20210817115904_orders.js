
exports.up = function(knex) {
    return knex.schema.createTable('orders', (table) => {
        table.increments('id');
        table.timestamps(true, true);
        table.string('nsn').notNullable();
        table.string('first').notNullable();
        table.string('last').notNullable();
        table.integer('quantity');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('orders')
};
