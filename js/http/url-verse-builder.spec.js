const chai = require('chai')
const expect = chai.expect
const urlVerseBuilder = require('./url-verse-builder')
const apiKey = 'XXXXX'
const ENDPOINT = `https://dbt.io/text/verse?v=2&key=${apiKey}`
const versions = [{AAAA: 'AAA'}, {BBBB: 'BBB'}]

describe('urlVerseBuilder', () => {

  let urls

  it('book', () => {
    urls = urlVerseBuilder(apiKey, versions, 'john')
    expect(urls).to.eql([
      ENDPOINT + '&dam_id=ENGAAAN2ET&book_id=John',
      ENDPOINT + '&dam_id=ENGBBBN2ET&book_id=John'
    ])
    expect(true).to.be.true
  })

  it('chapter', () => {
    urls = urlVerseBuilder(apiKey, versions, 'gn 1')
    expect(urls).to.eql([
      ENDPOINT + '&dam_id=ENGAAAO2ET&book_id=Gen&chapter_id=1',
      ENDPOINT + '&dam_id=ENGBBBO2ET&book_id=Gen&chapter_id=1'
    ])
    expect(true).to.be.true
  })

  it('verse', () => {
    urls = urlVerseBuilder(apiKey, versions, 'ob 5')
    expect(urls).to.eql([
      ENDPOINT + '&dam_id=ENGAAAO2ET&book_id=Obad&chapter_id=1&verse_start=5',
      ENDPOINT + '&dam_id=ENGBBBO2ET&book_id=Obad&chapter_id=1&verse_start=5'
    ])
    expect(true).to.be.true
  })

  it('verses', () => {
    urls = urlVerseBuilder(apiKey, versions, '1p 5:4-2')
    expect(urls).to.eql([
      ENDPOINT + '&dam_id=ENGAAAN2ET&book_id=1Pet&chapter_id=5&verse_start=2&verse_end=4',
      ENDPOINT + '&dam_id=ENGBBBN2ET&book_id=1Pet&chapter_id=5&verse_start=2&verse_end=4'
    ])
    expect(true).to.be.true
  })

  it('invalid', () => {
    urls = urlVerseBuilder(apiKey, versions, 'gn 51')
    expect(urls).to.be.null
  })
})
