const _ = require('lodash')

const versions = require('./versions')

const humanReadableVersions = _.map(versions, version => {
  return _.omit(version, ['code'])
})

const computerReadableVersions = _.reduce(versions, (acc, version) => {
  acc[version.abbr] = version.code
  return acc
}, {})

const protocol = 'https'
const host = 'dbt.io'
const query = {v: 2}

// methods facilitate stubbing

const config = {
  humanReadableVersions,
  getMaxConcurrentVersions: () => 4,
  getSupportedVersions: () => Object.freeze(computerReadableVersions),
  urlSearchObj: {protocol, host, pathname: '/text/search', query},
  urlVerseObj: {protocol, host, pathname: '/text/verse', query}
}

module.exports = config
