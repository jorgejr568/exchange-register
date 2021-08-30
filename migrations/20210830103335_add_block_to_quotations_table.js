const CONSTS = require('../utils/constants')

exports.up = function (knex) {
  return knex.schema.table(CONSTS.collections.quotations, (table) => {
    table.string('block', 20).index()
  })
}

exports.down = function (knex) {
  return knex.schema.table(CONSTS.collections.quotations, (table) => {
    table.dropColumn('block')
  })
}
