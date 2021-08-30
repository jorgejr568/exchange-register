const Hashids = require('hashids')
const CONSTS = require('./constants')

/**
 * Will apply HashID lib using const.SALT into it
 * @param id {number}
 * @constructor
 */

const lib = new Hashids(CONSTS.apis.hashids.salt)
const HashId = (id) => lib.encodeHex(id)

module.exports = HashId
