
exports.up = function(knex) {
  return knex.schema.createTable('images', (table) => {
    table.increments('id');
    table.string('filename').notNullable();
    table.binary('img').notNullable();
    table.integer('item_id').unsigned().notNullable();
    table.foreign('item_id').references('id').inTable('items');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('images')
};
