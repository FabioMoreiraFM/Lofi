
exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', table => {
      table.increments('id').primary()
      table.string('title').notNull()
      table.binary('content').notNull()
      table.string('imgPath', 1000).notNull()
      table.date('published').notNull()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles')
};
