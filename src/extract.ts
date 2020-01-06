const extractArticleContent = require('./extract-article-content')

/**
 * Extracts the main article content from a webpage or article, in addition to lots of useful metadata.
 *
 * @param url - Link to website to process.
 */
export default async function extract(url: string): Promise<object> {
  const article = await extractArticleContent(url)

  return article
}
