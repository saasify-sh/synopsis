/**
 * https://www.diffbot.com/dev/docs/article
 *
 * NOTE: enabling 'norender' provides a nice speedup but tends to miss in-article images.
 */

'use strict'

const request = require('request-promise-native').defaults({
  baseUrl: 'https://api.diffbot.com/v3',
  json: true
})

const pCache = require('p-cache')({
  label: 'diffbot',
  max: 5000
})

exports.article = pCache(async (url) => {
  return request({
    uri: '/article',
    qs: {
      token: process.env.DIFFBOT_TOKEN,
      url,
      discussion: false,
      paging: false
    }
  })
})
