const {Request, Response} = require('express')
const CONSTS = require('../utils/constants')
const QuotationService = require('../services/quotation_service')
const ExchangeAPI = require('../apis/exchange')

class QuotationHandler {
  /**
   *
   * @param QuotationService {QuotationService}
   * @param ExchangeAPI {ExchangeAPI}
   */
  constructor (QuotationService, ExchangeAPI) {
    this.QuotationService = QuotationService;
    this.ExchangeAPI = ExchangeAPI;
  }
  /**
   *
   * @param req {Request}
   * @param res {Response}
   * @returns Promise
   */
  register = (req, res) => {
    return new Promise((resolve) => {
      const key = req.header(CONSTS.key_header)

      if (key !== CONSTS.key){
        res.status(403).json({
          errors: [
            'Forbidden',
          ]
        })
        return resolve()
      }

      this
        .ExchangeAPI
        .latest()
        .then(({data}) => {
          const {success, rates} = data
          if (!success) {
            return res.status(500).json({
              errors: [
                'Error consulting exchanges API'
              ]
            })
          }

          const insert = Object.entries(rates).map(([target, quotation]) => ({
            base: CONSTS.currencies.EUR,
            target,
            quotation,
          }))

          this.QuotationService.create(insert).then((result) => {
            res.json({
              success: true,
              result,
            })
          }).catch((e) => {
            console.error(e)
            res.status(500).json({
              errors: [
                'Error creating quotations',
                e.message,
              ]
            })
          }).finally(() => resolve())
        })
        .catch((e) => {
          console.error(e.message)
          res
            .status(500)
            .json(e?.response?.body || ['Error consulting exchanges API'])
          resolve()

        })
    })
  }

  /**
   *
   * @param req {Request}
   * @param res {Response}
   * @returns Promise
   */
  index = (req, res) => {
    return new Promise((resolve => {
      this
        .QuotationService
        .listMostRecentBlocks()
        .then((result) => {
          res.json(result)
        })
        .catch(e => {
          res.status(500, {
            errors: [
              'Could not get most recent quotations'
            ]
          })
        })
        .finally(() => resolve())
    }))
  }

  /**
   *
   * @param req {Request}
   * @param res {Response}
   * @returns Promise
   */
  show = (req, res) => {
    return new Promise((resolve) => {
      const {block} = req.params
      this
        .QuotationService
        .listByBlock(block)
        .then(results => {
          res.json(results)
        })
        .catch(e => {
          res.status(500).json({
            errors: [
              'Could not get results by block'
            ]
          })
        })
        .finally(() => resolve())
    })
  }
}

module.exports = QuotationHandler
