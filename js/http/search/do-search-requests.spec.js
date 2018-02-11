const chai = require('chai')
const expect = chai.expect
const nock = require('nock')
const doSearchRequests = require('./do-search-requests')
const v = require('../../../versions-mock')

const UTDATA = '../../../test/utdata/js/http/search'
const URLS = [
  'http://dbt.io/text/search?v=2&key=XXXXX_YOUR_API_KEY_XXXXX&dam_id=ENGNASO2&query=thank%20you&offset=0&limit=2&echo=true',
  'http://dbt.io/text/search?v=2&key=XXXXX_YOUR_API_KEY_XXXXX&dam_id=ENGESVO2&query=thank%20you&offset=0&limit=2&echo=true'
]

describe('doSearchRequests', () => {

  it('search', done => {

    const response1 = require(UTDATA + '/do-search-requests-nas')
    const nocker1 = nock('http://dbt.io')
      .get('/text/search')
      .query(query => {
        return query.dam_id === 'ENGNASO2'
      })
      .reply(200, response1)

    const response2 = require(UTDATA + '/do-search-requests-esv')
    const nocker2 = nock('http://dbt.io')
      .get('/text/search')
      .query(query => {
        return query.dam_id === 'ENGESVO2'
      })
      .reply(200, response2)

    const expected = require(UTDATA + '/expected')

    doSearchRequests(URLS, [v[0], v[1]]).then(actual => {
      nocker1.done()
      nocker2.done()
      expect(actual).to.eql(expected)
      done()
    }).catch(err => {
      done(err)
    })
  })
})
