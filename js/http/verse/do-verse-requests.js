const axios = require('axios')
const chapterAndVerse = require('chapter-and-verse')
const getPrettyVerse = require('../common/get-pretty-verse')

const doVerseRequests = (urls, versions, ref) => {

  const cvso = chapterAndVerse(ref).toSimpleObject()

  const requests = urls.map(url => axios.get(url))
  return axios.all(requests).then(responses => {
    responses = responses.map(res => res.data)
    return responses.map((res, i) => {

      // meta
      const version = versions[i]
      const meta = {
        type: cvso.type,
        url: urls[i].replace(/&key=[^&]*&/, '&key=XXXXX_YOUR_API_KEY_XXXXX&'),
        versionName: version.name,
        versionAbbr: version.abbr,
        asString: cvso.asString,
        asShortString: cvso.asShortString,
        bookId: cvso.bookId,
        bookName: cvso.bookName,
        testament: cvso.testament,
        chapter: cvso.chapter,
        from: cvso.from,
        to: cvso.to,
        range: cvso.range,
        verseCount: res.length
      }

      // verses
      const verses = res.map(verse => getPrettyVerse(verse))

      return {
        meta,
        verses
      }
    })
  })
}

module.exports = doVerseRequests
