const CONSTS = require("../utils/constants");

class QuotationPostgresRepository {
  /**
   * @param pg
   * @param tableName {string}
   */
  constructor (pg, tableName) {
    this.pg = pg;
    this.tableName = tableName;
  }

  /**
   *
   * @param data {Object | Object[]}
   * @returns Promise
   */
  create = (data) => {
    const insert = Array.isArray(data) ? data : [data];

    return this
      .pg(this.tableName)
      .insert(insert, ['*'])
  }

  listMostRecent(limit){
    return this
      .pg
      .select('*')
      .from(this.tableName)
      .where('target', '<>', CONSTS.currencies.EUR)
      .orderBy('created_at', 'desc')
      .limit(limit)
  }
}

module.exports = QuotationPostgresRepository
