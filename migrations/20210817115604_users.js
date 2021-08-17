
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.string('first').notNullable();
        table.string('last').notNullable()
        table.string('dod').unique().notNullable()
    })
};
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
};
