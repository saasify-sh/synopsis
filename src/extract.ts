const extractArticleContent = require('./extract-article-content')

/**
 * Extracts the main article content from a website, in addition to lots of useful metadata.
 *
 * @param url - Link to website to process.
 * @param norender - Enablers or disables higher quality rendering of the website. `norender` is on by default for performance reasons.
 * @param discussion - Enables automatic extraction of article comments. This is disabled by default for performance reasons.
 * @param paging - Enables automatic concatenation of multiple-page articles. This is disabled by default for performance reasons.
 */
export default async function extract(
  url: string,
  norender: boolean = true,
  discussion: boolean = false,
  paging: boolean = false
): Promise<object> {
  const article = await extractArticleContent(url, {
    norender,
    discussion,
    paging
  })

  return article
}
