const CONSTS = Object.freeze({
  port: process.env.PORT || 3000,
  key:
    process.env.API_KEY ||
    'G|uAb7z2.lj<dC`l?x5WuzdM:#a)S/m!g{sh"#l!T,/|+39sndrXj"90V>H4TnU',
  key_header: 'Authorization',
  collections: {
    quotations: 'quotations',
  },
  apis: {
    exchange: {
      key: process.env.EXCHANGE_API_KEY,
      url: process.env.EXCHANGE_API_URL || 'http://api.exchangeratesapi.io',
    },
    hashids: {
      salt: process.env.HASHIDS_SALT || '85277e73-7c96-4bf9-a896-d982b834b55f',
    },
  },
  currencies: {
    GBP: 'GBP',
    USD: 'USD',
    EUR: 'EUR',
    BRL: 'BRL',
  },
  pg: {
    host: process.env.PG_HOST,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT || 5432,
    database: process.env.PG_DATABASE,
  },
})

module.exports = CONSTS
