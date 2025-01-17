
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('userId').primary()
        table.string('name').notNull()
        table.string('email').notNull()
        table.string('password').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')  
};
