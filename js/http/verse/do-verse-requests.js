const axios = require('axios')
const _ = require('lodash')
const chapterAndVerse = require('chapter-and-verse')

const doVerseRequests = (urls, versions, ref) => {

  const cvso = chapterAndVerse(ref).toSimpleObject()

  const requests = urls.map(url => axios.get(url))
  return axios.all(requests).then(responses => {
    responses = responses.map(res => res.data)
    return responses.map((res, i) => {

      const version = _.pick(versions[i], ['name', 'abbr'])
      const meta = _.assign({}, {versionName: version.name, versionAbbr: version.abbr}, cvso, {verseCount: res.length})
      const verses = res.map(verse => ({
        bookId: verse.book_id,
        bookName: verse.book_name,
        chapter: parseInt(verse.chapter_id),
        verse: parseInt(verse.verse_id),
        text: verse.verse_text.replace(/ \n\t\t\t$/, '').trim()
      }))

      return {
        meta,
        verses
      }
    })
  })
}

module.exports = doVerseRequests
