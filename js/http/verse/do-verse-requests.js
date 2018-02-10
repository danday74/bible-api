const axios = require('axios')

const doVerseRequests = urls => {
  const requests = urls.map(url => axios.get(url))
  return axios.all(requests).then(versions => {
    versions = versions.map(version => version.data)
    return versions.map(version => {
      return version
    })
  })
}

module.exports = doVerseRequests
