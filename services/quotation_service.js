const QuotationRepository = require('../repositories/quotation_postgres_repository')

class QuotationServiceClass {
  /**
   *
   * @param QuotationRepo {QuotationRepository}
   */
  constructor (QuotationRepo) {
    this.QuotationRepo = QuotationRepo;
  }

  /**
   *
   * @param data {Object | Object[]}
   */
  create(data){
    return this.QuotationRepo.create(data)
  }

  listMostRecent(){
    return this.QuotationRepo.listMostRecent(20)
  }
}

module.exports = QuotationServiceClass
