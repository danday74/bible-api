const _ = require('lodash')
const url = require('url')
const config = require('../../config')

// example URLs
// SEARCH  http://dbt.io/text/search?v=2&key=0d1bd6c2bff512d1e68a37bb224c8247&dam_id=ENGESVO2&query=beautiful are the feet of those who preach

const urlSearchBuilder = (apiKey, versions, q) => {

  return _.map(versions, v => {

    const version = _.values(v)[0]
    const damId = 'ENG' + version + 'O2'

    const urlSearchObj = _.cloneDeep(config.urlSearchObj)
    urlSearchObj.query.key = apiKey
    urlSearchObj.query.dam_id = damId
    urlSearchObj.query.query = q
    return url.format(urlSearchObj)
  })
}

module.exports = urlSearchBuilder
