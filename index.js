const config = require('./config')
const getVersions = require('./js/helpers/get-versions')
const makeHttpRequests = require('./js/http/make-http-requests')
const urlSearchBuilder = require('./js/http/url-search-builder')
const urlVerseBuilder = require('./js/http/url-verse-builder')

class BibleApi {

  constructor() {
    this.defaultVersions = getVersions()
  }

  checkApiKey() {
    const message =
      `
      An API key is required - Set you API key with bibleApi.setApiKey("YOUR_API_KEY")
      If you do not have an API key you can request one for free at www.digitalbibleplatform.com
      `
    if (this.apiKey == null) throw Error(message)
  }

  getVersions() {
    return config.publicVersions
  }

  setApiKey(apiKey) {
    if (typeof apiKey !== 'string') throw TypeError('API key must be a string')
    this.apiKey = apiKey.trim()
  }

  setDefaultVersions(versions) {
    this.defaultVersions = getVersions(versions, this.defaultVersions)
  }

  getReference(reference, versions) {
    if (typeof reference !== 'string') throw TypeError('reference must be a string - e.g. "John 3:16"')
    this.checkApiKey()
    versions = getVersions(versions, this.defaultVersions)
    const urls = urlVerseBuilder(this.apiKey, versions, reference)
    makeHttpRequests(urls)
    // if (urls == null) return null // need to consider promise return format
  }

  search(query, versions) {
    if (typeof query !== 'string') throw TypeError('query must be a string - e.g. "beautiful are the feet of those who preach"')
    this.checkApiKey()
    versions = getVersions(versions, this.defaultVersions)
    const urls = urlSearchBuilder(this.apiKey, versions, query)
    makeHttpRequests(urls)
  }
}

module.exports = new BibleApi()
