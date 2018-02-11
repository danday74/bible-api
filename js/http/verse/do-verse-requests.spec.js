const chai = require('chai')
const expect = chai.expect
const nock = require('nock')
const doVerseRequests = require('./do-verse-requests')
const v = require('../../../versions-mock')

const UTDATA = '../../../test/utdata/js/http/verse'
const URLS = [
  'http://dbt.io/text/verse?v=2&key=XXXXX_YOUR_API_KEY_XXXXX&dam_id=ENGNASO2ET&book_id=Gen&chapter_id=7&verse_start=23&verse_end=30',
  'http://dbt.io/text/verse?v=2&key=XXXXX_YOUR_API_KEY_XXXXX&dam_id=ENGESVO2ET&book_id=Gen&chapter_id=7&verse_start=23&verse_end=30'
]

describe('doVerseRequests', () => {

  it('verses', done => {

    const response1 = require(UTDATA + '/do-verse-requests-nas')
    const nocker1 = nock('http://dbt.io')
      .get('/text/verse')
      .query(query => {
        return query.dam_id === 'ENGNASO2ET'
      })
      .reply(200, response1)

    const response2 = require(UTDATA + '/do-verse-requests-esv')
    const nocker2 = nock('http://dbt.io')
      .get('/text/verse')
      .query(query => {
        return query.dam_id === 'ENGESVO2ET'
      })
      .reply(200, response2)

    const expected = require(UTDATA + '/expected')

    doVerseRequests(URLS, [v[0], v[1]], 'gn 7:23-30').then(actual => {
      nocker1.done()
      nocker2.done()
      expect(actual).to.eql(expected)
      done()
    }).catch(err => {
      done(err)
    })
  })
})
