const config = require('./config')
const getVersions = require('./js/helpers/get-versions')
const makeHttpRequests = require('./js/http/make-http-requests')
const urlSearchBuilder = require('./js/http/url-search-builder')
const urlVerseBuilder = require('./js/http/url-verse-builder')
const errors = require('./errors')

class BibleApi {

  constructor() {
    this.defaultVersions = getVersions()
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

  getReference(reference, versions) {
    if (typeof reference !== 'string') throw errors.type.reference()
    this.checkApiKey()
    versions = getVersions(versions, this.defaultVersions)
    const urls = urlVerseBuilder(this.apiKey, versions, reference)
    if (urls == null) throw errors.generic.reference(reference)
    makeHttpRequests(urls)
  }

  search(query, versions) {
    if (typeof query !== 'string') throw errors.type.query()
    this.checkApiKey()
    versions = getVersions(versions, this.defaultVersions)
    const urls = urlSearchBuilder(this.apiKey, versions, query)
    makeHttpRequests(urls)
  }
}

module.exports = new BibleApi()
