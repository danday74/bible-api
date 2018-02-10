const chai = require('chai')
const expect = chai.expect
const urlSearchBuilder = require('./url-search-builder')
const apiKey = 'XXXXX'
const ENDPOINT = `http://dbt.io/text/search?v=2&key=${apiKey}`
const v = require('../../../versions-mock')

describe('urlSearchBuilder', () => {

  let urls

  it('search', () => {
    urls = urlSearchBuilder(apiKey, [v[0], v[1]], 'fred bloggs')
    expect(urls).to.eql([
      ENDPOINT + '&dam_id=ENGXAXO2&query=fred%20bloggs',
      ENDPOINT + '&dam_id=ENGXBXO2&query=fred%20bloggs'
    ])
    expect(true).to.be.true
  })
})
