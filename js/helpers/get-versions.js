const _ = require('lodash')
const typeCheck = require('type-check').typeCheck
const config = require('../../config')

const tc = versions => {
  const valid = typeCheck('String | [String]', versions) || typeCheck('[Object]', versions)
  if (!valid) throw TypeError('versions must be a string or string array - e.g. ["ESV", "KJV"]')
}

const supportedVersionsAsArray = () => {
  const supportedVersions = config.getSupportedVersions()
  return _.map(supportedVersions, (v, k) => ({[k]: v}))
}

const getFilteredVersionsArray = versions => {

  if (typeCheck('String', versions)) {
    if (versions.toUpperCase() === 'CORE') {
      return supportedVersionsAsArray()
    } else {
      versions = [versions]
    }
  }

  if (typeCheck('[String]', versions)) {

    const supportedVersions = config.getSupportedVersions()

    versions = _.reduce(versions, (acc, v) => {
      const value = supportedVersions[v.toUpperCase()]
      if (value) {
        const version = {[v]: value}
        acc.push(version)
      }
      return acc
    }, [])
    return versions
  } else {
    return _.intersectionWith(versions, supportedVersionsAsArray(), _.isEqual)
  }
}

const getVersions = (versions = [], defaultVersions = []) => {
  tc(versions)
  tc(defaultVersions)

  versions = getFilteredVersionsArray(versions)

  if (!versions.length) {
    defaultVersions = getFilteredVersionsArray(defaultVersions)
    versions = defaultVersions.length > 0 ? defaultVersions : [supportedVersionsAsArray()[0]]
  }

  return _.take(versions, config.getMaxConcurrentVersions())
}

module.exports = getVersions
