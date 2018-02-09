const chai = require('chai')
const expect = chai.expect
const urlSearchBuilder = require('./url-search-builder')
const apiKey = 'XXXXX'
const ENDPOINT = `http://dbt.io/text/search?v=2&key=${apiKey}`
const versions = [{AAAA: 'AAA'}, {BBBB: 'BBB'}]

describe('urlSearchBuilder', () => {

  let urls

  it('search', () => {
    urls = urlSearchBuilder(apiKey, versions, 'fred bloggs')
    expect(urls).to.eql([
      ENDPOINT + '&dam_id=ENGAAAO2&query=fred%20bloggs',
      ENDPOINT + '&dam_id=ENGBBBO2&query=fred%20bloggs'
    ])
    expect(true).to.be.true
  })
})
