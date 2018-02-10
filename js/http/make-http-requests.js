const axios = require('axios')

const makeHttpRequests = urls => {
  const requests = urls.map(url => axios.get(url))
  return axios.all(requests)
}

module.exports = makeHttpRequests
