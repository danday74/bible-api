const config = require('./config')
const getVersions = require('./js/helpers/get-versions')
const doSearchRequests = require('./js/http/search/do-search-requests')
const doVerseRequests = require('./js/http/verse/do-verse-requests')
const urlSearchBuilder = require('./js/http/search/url-search-builder')
const urlVerseBuilder = require('./js/http/verse/url-verse-builder')
const errors = require('./errors')

class BibleApi {

  constructor() {
    this.defaultVersions = getVersions()
    this.resultsPerPage = 50
  }

  checkApiKey() {
    if (this.apiKey == null) throw errors.generic.apiKey()
  }

  getVersions() {
    return config.publicVersions
  }

  setApiKey(apiKey) {
    if (typeof apiKey !== 'string') throw errors.type.apiKey()
    this.apiKey = apiKey.trim()
  }

  setDefaultVersions(versions) {
    this.defaultVersions = getVersions(versions, this.defaultVersions)
  }

  setNumberOfSearchResultsPerPage(resultsPerPage) {
    if (!Number.isInteger(resultsPerPage) || resultsPerPage < 1) throw errors.type.resultsPerPage()
    this.resultsPerPage = resultsPerPage
  }

  getReference(reference, versions) {
    if (typeof reference !== 'string') throw errors.type.reference()
    this.checkApiKey()
    versions = getVersions(versions, this.defaultVersions)
    const urls = urlVerseBuilder(this.apiKey, versions, reference)
    if (urls == null) throw errors.generic.reference(reference)
    return doVerseRequests(urls, versions, reference)
  }

  search(query, versions, offset = 0) {
    if (typeof query !== 'string') throw errors.type.query()
    if (!Number.isInteger(offset) || offset < 0) throw errors.type.offset()
    this.checkApiKey()
    versions = getVersions(versions, this.defaultVersions)
    const urls = urlSearchBuilder(this.apiKey, versions, query, offset, this.resultsPerPage)
    return doSearchRequests(urls, versions)
  }
}

module.exports = new BibleApi()
