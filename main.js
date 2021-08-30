require('./env')

const express = require('express')
const CONSTS = require('./utils/constants')

const QuotationRepository = require('./repositories/quotation_postgres_repository')
const QuotationService = require('./services/quotation_service')
const ExchangesAPI = require('./apis/exchange')
const QuotationHandler = require('./handlers/quotation_handler')
const PostgresConnect = require('./db')

const app = express()

/**
 * Setting up repositories and apis
 */
const pg = PostgresConnect({
  database: CONSTS.pg.database,
  user:     CONSTS.pg.username,
  password: CONSTS.pg.password,
  port:     CONSTS.pg.port,
  host:     CONSTS.pg.host,
})


const quotation_repository = new QuotationRepository(
  pg,
  CONSTS.collections.quotations,
)
const exchange_api = new ExchangesAPI(CONSTS.apis.exchange.url, CONSTS.apis.exchange.key)

/**
 * Setting up services
 */
const quotation_service = new QuotationService(quotation_repository)

/**
 * Setting up handlers
 */
const quotation_handler = new QuotationHandler(quotation_service, exchange_api)


/**
 * Registering routes
 */
app.post('/', quotation_handler.register)
app.get('/', quotation_handler.index)
app.get('/:block', quotation_handler.show)

app.listen(CONSTS.port, () => console.log(`Server running at http://localhost:${CONSTS.port}`))
