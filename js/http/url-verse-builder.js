const _ = require('lodash')
const chapterAndVerse = require('chapter-and-verse')
const url = require('url')
const config = require('../../config')

// example URLs
// BOOK    http://dbt.io/text/verse?v=2&key=0d1bd6c2bff512d1e68a37bb224c8247&dam_id=ENGESVN2ET&book_id=John
// CHAPTER http://dbt.io/text/verse?v=2&key=0d1bd6c2bff512d1e68a37bb224c8247&dam_id=ENGESVN2ET&book_id=John&chapter_id=3
// VERSE   http://dbt.io/text/verse?v=2&key=0d1bd6c2bff512d1e68a37bb224c8247&dam_id=ENGWEBN2ET&book_id=John&chapter_id=3&verse_start=16
// VERSES  http://dbt.io/text/verse?v=2&key=0d1bd6c2bff512d1e68a37bb224c8247&dam_id=ENGKJVN2ET&book_id=John&chapter_id=3&verse_start=16&verse_end=18

const urlVerseBuilder = (apiKey, versions, ref) => {

  const cv = chapterAndVerse(ref)
  if (cv == null) return null
  const book = cv.book

  return _.map(versions, version => {

    const damId = 'ENG' + version.code + book.testament + '2ET'

    const urlVerseObj = _.cloneDeep(config.urlVerseObj)
    urlVerseObj.query.key = apiKey
    urlVerseObj.query.dam_id = damId
    urlVerseObj.query.book_id = book.id
    if (cv.chapter) urlVerseObj.query.chapter_id = cv.chapter
    if (cv.from) urlVerseObj.query.verse_start = cv.from
    if (cv.to !== cv.from) urlVerseObj.query.verse_end = cv.to
    return url.format(urlVerseObj)
  })
}

module.exports = urlVerseBuilder
