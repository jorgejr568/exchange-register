const { Request, Response } = require('express')
const CONSTS = require('../utils/constants')
const QuotationService = require('../services/quotation_service')
const ExchangeAPI = require('../apis/exchange')

class QuotationHandler {
  /**
   *
   * @param QuotationService {QuotationService}
   * @param ExchangeAPI {ExchangeAPI}
   */
  constructor(QuotationService, ExchangeAPI) {
    this.QuotationService = QuotationService
    this.ExchangeAPI = ExchangeAPI
  }
  /**
   *
   * @param req {Request}
   * @param res {Response}
   * @returns Promise
   */
  register = async (req, res) => {
    const key = req.header(CONSTS.key_header)

    if (key !== CONSTS.key) {
      return res.status(403).json({
        errors: ['Forbidden'],
      })
    }

    let rates
    try {
      const { data } = await this.ExchangeAPI.latest()
      if (!data.success) {
        throw new Error('rates unsuccessful')
      }

      rates = data.rates
    } catch (e) {
      console.error(e)
      return res.status(500).json({
        errors: ['Error consulting exchanges API'],
      })
    }

    try {
      const insert = Object.entries(rates).map(([target, quotation]) => ({
        base: CONSTS.currencies.EUR,
        target,
        quotation,
      }))

      const result = await this.QuotationService.create(insert)

      res.json({
        success: true,
        result,
      })
    } catch (e) {
      console.error(e)
      return res.status(500).json({
        errors: ['Error creating quotations', e.message],
      })
    }
  }

  /**
   *
   * @param req {Request}
   * @param res {Response}
   * @returns Promise
   */
  index = async (req, res) => {
    try {
      const results = await this.QuotationService.listMostRecentBlocks()
      return res.json(results)
    } catch (e) {
      return res.status(500, {
        errors: ['Could not get most recent quotations'],
      })
    }
  }

  /**
   *
   * @param req {Request}
   * @param res {Response}
   * @returns Promise
   */
  show = async (req, res) => {
    console.log('Calling {show} handler')
    const { block } = req.params
    console.info(`Listing quotations on block ${block}`)
    try {
      const results = await this.QuotationService.listByBlock(block)
      console.info(`${results?.length} found on listByBlock`)
      res.json(results)
    } catch (e) {
      console.error(e)
      return res.status(500).json({
        errors: ['Could not get results by block'],
      })
    }
  }
}

module.exports = QuotationHandler
