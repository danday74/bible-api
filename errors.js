const PREFIX = 'bible-api error =>'

const genericApiKeyMessage = `
${PREFIX} An API key is required - Set you API key with bibleApi.setApiKey("YOUR_API_KEY")
If you do not have an API key you can request one for free at www.digitalbibleplatform.com
`

const errors = {
  type: {
    apiKey: () => TypeError(PREFIX + ' apiKey must be a string'),
    reference: () => TypeError(PREFIX + ' reference must be a string - e.g. "John 3:16"'),
    query: () => TypeError(PREFIX + ' query must be a string - e.g. "beautiful are the feet of those who preach"')
  },
  generic: {
    apiKey: () => Error(genericApiKeyMessage),
    reference: ref => Error(PREFIX + ` Invalid reference - the biblical reference "${ref}" cannot be resolved`)
  }
}

module.exports = errors
