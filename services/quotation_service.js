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

  listMostRecentBlocks = () => {
    return new Promise((resolve) => {
      this.QuotationRepo.listMostRecentBlocks(20).then((results) =>
        resolve(results)
      )
    })
  }

  listByBlock = (block) => {
    return new Promise((resolve) => {
      this.QuotationRepo.listByBlock(block)
        .then((results) => resolve(this.resultsParser(results)))
        .catch(() => resolve([]))
    })
  }
}

module.exports = QuotationServiceClass
