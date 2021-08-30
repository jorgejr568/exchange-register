const { nanoid } = require('nanoid')
const QuotationRepository = require('../repositories/quotation_postgres_repository')
const HashId = require('../utils/hashids')

class QuotationServiceClass {
  /**
   *
   * @param QuotationRepo {QuotationRepository}
   */
  constructor(QuotationRepo) {
    this.QuotationRepo = QuotationRepo
  }

  /**
   *
   * @param data {Object | Object[]}
   */
  create(data) {
    if (!Array.isArray(data)) data = [data]

    const block = nanoid(20)
    data = data.map((d) => ({ block, ...d }))
    return this.QuotationRepo.create(data)
  }

  resultsParser(results) {
    return results.map(({ id, ...rest }) => ({ id: HashId(id), ...rest }))
  }

  listMostRecentBlocks = async () => {
    try {
      const results = await this.QuotationRepo.listMostRecentBlocks(20)
      return results
    } catch (e) {
      console.error(e)
      return []
    }
  }

  /**
   *
   * @param block
   * @returns {Promise<Object[]>}
   */
  listByBlock = async (block) => {
    try {
      console.info(`Calling repo - listByBlock ${block} `)
      const results = await this.QuotationRepo.listByBlock(block)
      console.info(`${results.length} returned by repo - listByBlock ${block} `)
      return this.resultsParser(results)
    } catch (e) {
      console.error(e)
      return []
    }
  }
}

module.exports = QuotationServiceClass
