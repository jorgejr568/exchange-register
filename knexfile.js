const CONSTS = require('./utils/constants')
module.exports = {
  client: 'postgresql',
  connection: {
    database: CONSTS.pg.database,
    user:     CONSTS.pg.username,
    password: CONSTS.pg.password,
    port:     CONSTS.pg.port,
    host:     CONSTS.pg.host,
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'migrations',
    directory: './migrations',
  },
};
