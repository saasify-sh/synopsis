# automagical-summarization

> Powerful text summarization as a service hosted by [Saasify](https://saasify.sh).

This project provides a hosted, SaaS version of the open source [text-summarization](https://github.com/transitive-bullshit/text-summarization) module by [Automagical](https://automagical.ai), which was [acquired by Verblio in 2018](https://www.verblio.com/blog/we-bought-a-company).

<a href="https://dev_automagical-summarization.saasify.sh">
  <img
    src="https://badges.saasify.sh"
    height="40"
    alt="View Hosted API"
  />
</a>

## Features

- Uses a variety of metrics to generate quality extractive text summaries
- Summarizes html or text content
- Utilizes html structure as a signal of text importance
- Includes basic abstractive shortening of extracted sentences
- Thoroughly tested and used in production

## Examples

```
curl -X POST \
  'https://api.saasify.sh/1/call/dev/automagical-summarization' \
  -H 'Content-Type: multipart/form-data' \
  -F 'input=@fixtures/automagical-2.html'
```

which outputs:

```json
[
  "So tell me, hotshot, if video is so amazing why are you feeding me this long <redacted> blog post?",
  "When is it reasonable to want to be a phone book?",
  "YOU’RE good at creating great written content.",
  "You hack something together in a few hours.",
  "But it sucks, no one engages and you swear off video as ineffective snake oil (something you’ll regret later)",
  "You shell out money to a freelancer and they rake you over the coals for a price no person should pay for a short video.",
  "That’s why we created Automagical."
]
```

## Metrics

Set `debug` to `true` to view the full metrics for the top sentences which will give you a better understanding of why certain sentences were deemed more important by the algorithm.

- tfidf overlap for base relative sentence importance
- html node boosts for tags like `<h1>` and `<strong>`
- listicle boosts for lists like `2) second item`
- penalty for poor readability or really long sentences

Here's an example of a sentence's internal structure after normalization, processing, and scoring:

```js
{
  "index": 8,
  "sentence": {
    "original": "4. For the cost of 1 highly produced video, you can get a year's worth of videos from Automagical.",
    "listItem": 4,
    "actual": "For the cost of 1 highly produced video, you can get a year's worth of videos from Automagical.",
    "normalized": "for the cost of 1 highly produced video you can get a years worth of videos from automagical",
    "tokenized": [
      "cost",
      "highly",
      "produced",
      "video",
      "years",
      "worth",
      "videos",
      "automagical"
    ]
  },
  "liScore": 1,
  "nodeScore": 0.7,
  "readabilityPenalty": 0,
  "tfidfScore": 0.8019447657605553,
  "score": 5.601944765760555
}
```

## License

MIT © [Saasify](https://saasify.sh)
