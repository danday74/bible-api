const axios = require('axios')
const getPrettyVerse = require('../common/get-pretty-verse')

const doSearchRequests = (urls, versions) => {

  const requests = urls.map(url => axios.get(url))
  return axios.all(requests).then(responses => {
    responses = responses.map(res => res.data)
    return responses.map((res, i) => {

      const header = res[0]
      const resSummary = res[1][0][0]
      const resVerses = res[1][1]

      // meta
      const version = versions[i]
      const meta = {
        type: 'search',
        url: urls[i].replace(/&key=[^&]*&/, '&key=XXXXX_YOUR_API_KEY_XXXXX&'),
        versionName: version.name,
        versionAbbr: version.abbr,
        query: header.query,
        totalResults: parseInt(resSummary.total_results),
        offset: parseInt(header.offset),
        resultsPerPage: parseInt(header.limit),
        verseCount: resVerses.length
      }

      // verses
      const verses = resVerses.map(verse => getPrettyVerse(verse))

      return {
        meta,
        verses
      }
    })
  })
}

module.exports = doSearchRequests
