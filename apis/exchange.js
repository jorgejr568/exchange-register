const axios = require('axios')

class ExchangeRatesAPI {
  constructor(baseURL, accessKey) {
    this.accessKey = accessKey
    this.client = axios.create({
      baseURL,
    })
  }

  latest(symbols = []) {
    return this.client.get('/v1/latest', {
      params: {
        symbols: symbols.length ? symbols.join(',') : '',
        access_key: this.accessKey,
      },
    })
  }
}

module.exports = ExchangeRatesAPI
