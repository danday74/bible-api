// methods facilitate stubbing

const protocol = 'http'
const host = 'dbt.io'
const query = {v: 2}

const config = {
  getMaxConcurrentVersions: () => 4,
  getSupportedVersions: () => Object.freeze({ESV: 'ESV', WEB: 'WEB', NASB: 'NAS', KJV: 'KJV'}),
  urlSearchObj: {protocol, host, pathname: '/text/search', query},
  urlVerseObj: {protocol, host, pathname: '/text/verse', query}
}

module.exports = config
