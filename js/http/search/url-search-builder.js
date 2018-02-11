const _ = require('lodash')
const url = require('url')
const config = require('../../../config')

// example URLs
// SEARCH  http://dbt.io/text/search?v=2&key=0d1bd6c2bff512d1e68a37bb224c8247&dam_id=ENGESVO2&query=beautiful+are+the+feet+of+those+who+preach

const urlSearchBuilder = (apiKey, versions, q, offset, resultsPerPage) => {

  return _.map(versions, version => {

    const damId = 'ENG' + version.code + 'O2'

    const urlSearchObj = _.cloneDeep(config.urlSearchObj)
    urlSearchObj.query.key = apiKey
    urlSearchObj.query.dam_id = damId
    urlSearchObj.query.query = q
    urlSearchObj.query.offset = offset
    urlSearchObj.query.limit = resultsPerPage
    urlSearchObj.query.echo = true
    return url.format(urlSearchObj)
  })
}

module.exports = urlSearchBuilder
