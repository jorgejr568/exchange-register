const knex = require('knex')
/**
 *
 * @param host
 * @param user
 * @param password
 * @param database
 * @param port
 * @constructor
 * @returns knex.Client
 */
const PostgresConnect = ({ host, user, password, database, port }) => {
  return knex({
    client: 'pg',
    connection: {
      host,
      user,
      password,
      database,
      port,
    },
    migrations: {
      tableName: 'migrations',
    },
    pool: { min: 0, max: 10, idleTimeoutMillis: 500 },
  })
}

module.exports = PostgresConnect
