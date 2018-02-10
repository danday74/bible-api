const _ = require('lodash')
const typeCheck = require('type-check').typeCheck
const config = require('../../config')

const tc = versions => {
  const valid = typeCheck('String | [String]', versions) || typeCheck('[Object]', versions)
  if (!valid) throw TypeError('versions must be a string or string array - e.g. ["ESV", "KJV"]')
}

const getFilteredVersions = versions => {

  const supportedVersions = config.getSupportedVersions()

  if (typeCheck('String', versions)) {
    if (versions.toUpperCase() === 'CORE') {
      return supportedVersions
    } else {
      versions = [versions]
    }
  }

  if (typeCheck('[String]', versions)) {
    return _.reduce(versions, (acc, v) => {
      const version = _.find(supportedVersions, {'abbr': v.toUpperCase()})
      if (version) acc.push(version)
      return acc
    }, [])
  } else {
    return _.intersectionWith(versions, supportedVersions, _.isEqual)
  }
}

const getVersions = (versions = [], defaultVersions = []) => {

  tc(versions)
  tc(defaultVersions)

  versions = getFilteredVersions(versions)

    if (!versions.length) {
    defaultVersions = getFilteredVersions(defaultVersions)
    versions = defaultVersions.length > 0 ? defaultVersions : [config.getSupportedVersions()[0]]
  }

  return _.take(versions, config.getMaxConcurrentVersions())
}

module.exports = getVersions
