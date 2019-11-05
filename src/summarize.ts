import summarizeImpl = require('text-summarization')
import isHtml = require('is-html')

import * as types from './types'

const extractArticleContent = require('./extract-article-content')

/**
 * Summarizes the content of any `url` or `input` text.
 *
 * Must provide either `url` or `input`.
 *
 * Returns the summary as an array of strings / sentences.
 *
 * @param url - Link to website to summarize.
 * @param input - Text or HTML to summarize.
 * @param title - Title of `input` content.
 * @param numSentences - Optional number of sentences to produce. Default is to
 * infer a reasonable number based on the input's length.
 * @param minNumSentences - Optional minimum number of sentences to produce.
 * @param maxNumSentences - Optional maximum number of sentences to produce.
 * @param minImageWidth - Optional minimum image width when considering images in HTML.
 * @param minImageHeight - Optional minimum image height when considering images in HTML.
 * @param media - Whether or not to consider source media during summarization.
 */
export default async function summarize(
  url?: string,
  input?: string,
  title?: string,
  numSentences?: number,
  minNumSentences: number = 1,
  maxNumSentences: number = 1000,
  minImageWidth: number = 400,
  minImageHeight: number = 300,
  media: boolean = false
): Promise<string[]> {
  const opts: types.SummarizationOptions = {
    title,
    minNumSentences,
    maxNumSentences,
    minImageWidth,
    minImageHeight,
    media
  }

  if (url) {
    const article = await extractArticleContent(url)
    opts.title = article.title
    opts.html = article.html
    opts.text = article.text
  } else if (input) {
    const isInputHtml = isHtml(input)
    if (isInputHtml) {
      opts.html = input
    } else {
      opts.text = input
    }
  } else {
    throw new Error('must provide either "url" or "input" to process')
  }

  const result = await (summarizeImpl(opts) as Promise<types.SummarizationResult>)
  // console.log(JSON.stringify(result, null, 2))

  return result.abstractive || result.extractive
}
