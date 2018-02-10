const axios = require('axios')

const makeHttpRequests = urls => {
  if (urls == null) {
    return Promise.reject(null)
  }
  const requests = urls.map(url => axios.get(url))
  return axios.all(requests)
}

module.exports = makeHttpRequests
