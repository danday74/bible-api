const axios = require('axios')

const doSearchRequests = urls => {
  const requests = urls.map(url => axios.get(url))
  return axios.all(requests)
}

module.exports = doSearchRequests
