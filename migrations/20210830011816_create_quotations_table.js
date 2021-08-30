const CONSTS = require('../utils/constants')

exports.up = function(knex) {
  return knex.schema.createTable(CONSTS.collections.quotations, (table) => {
    table.bigIncrements('id', {primaryKey: true})
    table.string('base', 3)
    table.string('target', 3)
    table.float('quotation', 20, 9)
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(CONSTS.collections.quotations)
};
