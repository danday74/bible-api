const _ = require('lodash')
const versions = require('./versions')

const publicVersions = _.map(versions, version => {
  return _.omit(version, ['code'])
})

const protocol = 'https'
const host = 'dbt.io'
const query = {v: 2}

// methods facilitate stubbing

const config = {
  publicVersions,
  getMaxConcurrentVersions: () => 4,
  getSupportedVersions: () => Object.freeze(versions),
  urlSearchObj: {protocol, host, pathname: '/text/search', query},
  urlVerseObj: {protocol, host, pathname: '/text/verse', query}
}

module.exports = config
