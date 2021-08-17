
exports.up = function(knex) {
  return knex.schema.createTable('items', (table) => {
      table.increments('id');
      table.string('nomenclature').notNullable();
      table.string('common');
      table.string('part_number');
      table.string('nsn').unique().notNullable();
      table.string('accounting');
      table.string('category');
      table.integer('image_id').unsigned().notNullable();
      table.foriegn('image_id').references('id').inTable('images');
      table.string('description');

  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('items')
};
