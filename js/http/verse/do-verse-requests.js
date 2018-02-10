const axios = require('axios')

const doVerseRequests = urls => {
  const requests = urls.map(url => axios.get(url))
  return axios.all(requests)
}

module.exports = doVerseRequests
