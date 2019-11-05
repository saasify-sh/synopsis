# automagical-summarization

> Automagical AI-powered summarization for websites and text hosted by [Saasify](https://saasify.sh).

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

The following examples all use [HTTPie](https://httpie.org/), a more intuitive version of `curl`.

### The Onion Example 1

*Input:* ([article](https://www.theonion.com/fun-toy-banned-because-of-three-stupid-dead-kids-1819565691))
```bash
http POST \
  'https://api.saasify.sh/1/call/dev/automagical-summarization/summarize' \
  'url=https://www.theonion.com/fun-toy-banned-because-of-three-stupid-dead-kids-1819565691'
```

*Output:*
```json
[
  "Fun Toy Banned Because Of Three Stupid Dead Kids",
  "So now we have to do a full recall and halt production on what was a really awesome toy.",
  "But now I'll never see it again, all because three stupid idiots had to go and wreck everything.\"",
  "\"She thought the broken shards were candy.",
  "That's what you'd assume after breaking a plastic, inedible toy, right?",
  "\"I considered this for a while, but then I decided no. No way.",
  "If you're 11 years old, you should know that it's impossible to fly.",
  "And poor Wizco's probably going to go bankrupt because of this shit."
]
```

<img src="https://raw.githubusercontent.com/saasify-sh/automagical-summarization/master/media/articles/the-onion-1.jpg" width="256" />

### The Onion Example 2

*Input:* ([article](https://local.theonion.com/plan-to-get-laid-at-dragoncon-2001-fails-1819566152))
*Input:*
```bash
http POST \
  'https://api.saasify.sh/1/call/dev/automagical-summarization/summarize' \
  'url=https://local.theonion.com/plan-to-get-laid-at-dragoncon-2001-fails-1819566152'
```

*Output:*
```json
[
  "Plan To Get Laid At DragonCon 2001 Fails",
  "\"I know a lot of girls online, but that's not really the same,\" Melcher said.",
  "\"I imagined some girl and I talking about the new Lord Of The Rings movie,\" Melcher said.",
  "\"I guess girls aren't into dragons and superheroes as much as guys are,\" Melcher said.",
  "\"Andy and I went to this Sailor Moon thing because we knew girls would be there,\" Melcher said.",
  "\"Make no mistake—we do not like Sailor Moon.",
  "The women, however, were only interested in talking about Sailor Moon.",
  "\"This one girl asked me if I wrote fan fiction, and I said yes,\" Melcher said.",
  "The following night, Melcher attended a party he had heard about in an online chat room."
]
```

<img src="https://raw.githubusercontent.com/saasify-sh/automagical-summarization/master/media/articles/the-onion-2.jpg" width="256" />

### The Onion Example 3

*Input:* ([article](https://www.theonion.com/everyone-involved-in-pizzas-preparation-delivery-purc-1819564897))
```bash
http POST \
  'https://api.saasify.sh/1/call/dev/automagical-summarization/summarize' \
  'url=https://www.theonion.com/everyone-involved-in-pizzas-preparation-delivery-purc-1819564897'
```

*Output:*
```json
[
  "Everyone Involved In Pizza's Preparation, Delivery, Buy Extremely High",
  "After taking the order, Lindeman relayed it to co-worker and fellow stoner Greg Kanner.",
  "At 1 a.m. Monday, the pizza came into material being for the first time.",
  "\"After all, it's just pizza, right?",
  "Also, Bickell and Wang had forgotten to include their apartment number with the order.",
  "Fuck!\" Behr later described the prolonged Blount Street search as \"a serious fucking hassle.\"",
  "\"They were seriously bitching me out,\" said Lindeman, who was royally baked at the time.",
  "\"I was like, 'Dude, just chill, your pizza will be there any sec.'\"",
  "Finally, at 3:10 a.m., more than three hours after the order was placed, the pizza reached its destination."
]
```

<img src="https://raw.githubusercontent.com/saasify-sh/automagical-summarization/master/media/articles/the-onion-3.jpg" height="130" />

### Wait But Why Example

*Input:* ([article](https://waitbutwhy.com/2015/01/artificial-intelligence-revolution-1.html))
```bash
http POST \
  'https://api.saasify.sh/1/call/dev/automagical-summarization/summarize' \
  'url=https://waitbutwhy.com/2015/01/artificial-intelligence-revolution-1.html'
```

*Output:*
```json
[
  "The AI Revolution: The Road to Superintelligence",
  "The Far Future—Coming Soon",
  "The Road to Superintelligence",
  "What Is AI?",
  "Where We Are Now—A World Running on ANI",
  "The Road From ANI to AGI",
  "Plagiarize the brain.",
  "Try to make evolution do what it did before but for us this time.",
  "Make this whole thing the computer’s problem, not ours.",
  "All This Could Happen Soon"
]
```

<img src="https://raw.githubusercontent.com/saasify-sh/automagical-summarization/master/media/articles/wait-but-why-1.png" width="256" />

## Metrics

Replace `/summarize` with `/detail` to see the full metrics for how the input was processed which will give you a better understanding of why certain sentences were deemed more important by the algorithm.

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
