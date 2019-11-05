'use strict'

const pRetry = require('p-retry')
const diffbot = require('./diffbot')

module.exports = async (url) => {
  const result = await module.exports.diffbot(url)
  const content = (result.objects && result.objects[0]) || {
    url,
    title: '',
    text: ''
  }

  content.images = (content.images || []).map((image) => ({
    type: 'image',
    width: image.naturalWidth,
    height: image.naturalHeight,
    url: encodeURI(image.url),
    title: image.title,
    primary: !!image.primary,
    source: { hotlinked: true }
  }))

  content.videos = (content.videos || []).map((video) => ({
    type: 'video',
    width: video.naturalWidth,
    height: video.naturalHeight,
    url: encodeURI(video.url),
    title: video.title,
    primary: !!video.primary
  }))

  content.keyPhrases = (content.tags || [])
  content.keywords = content.keyPhrases
    .filter((keyPhrase) => (keyPhrase.label.split(' ').length === 1))
    .map(phrase => phrase.label)

  content.externalIds = { diffbot: content.diffbotUri }
  console.log(JSON.stringify(content, null, 2))
  return content
}

module.exports.diffbot = (url) => {
  return pRetry(() => diffbot.article(url), {
    retries: 3,
    minTimeout: 1000
  })
}
