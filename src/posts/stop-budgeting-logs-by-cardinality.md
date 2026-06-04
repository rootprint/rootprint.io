---
title: "Stop budgeting your logs by cardinality"
description: "Label-indexed log systems make you ration which fields you can search. Here's why full-text plus columnar fields removes the budget — and what you give up."
date: "2026-06-04"
published: true
tags: ["observability", "search"]
cover: "/images/home-image.png"
---

There's a question label-first log systems force on you that no one should have to
answer at 2am: _is this field worth making a label?_

Make it a label and you can filter on it fast — but every distinct value spawns
a new stream, and the index pays for it. Leave it out and the field is along for
the ride in the log body, unindexed, slow to grep across weeks of data. So you
sit in a planning meeting and decide, up front, which dimensions of your own
logs you're allowed to slice by later. That's cardinality budgeting, and it's a
strange thing to have built a workflow around.

## The Loki bargain

Loki's design is genuinely clever: index only the labels, keep the log bodies as
cheap compressed chunks on object storage. Ingest is fast and storage is cheap
because there's almost no index to build. Grafana's own
[benchmark against Quickwit](https://quickwit.io/blog/benchmarking-quickwit-loki)
shows Loki ingesting the same dataset in roughly half the time and CPU.

The bill comes due at query time, and it's paid in cardinality. Labels are a
Prometheus-style index: every unique combination of label values is a separate
stream. Promote a high-cardinality field — `host.name`, `pod`, `request_id`, a
user IP — to a label and the stream count explodes. In that same benchmark, the
team tried making `host.name` a label and watched cardinality blow up; bucketing
hostnames to keep it under control was, in their words, _impractical._

So the field you most want during an incident — the one that's different on every
line — is exactly the field you're not allowed to index.

## What "high cardinality" actually costs you

The cost isn't abstract. Push cardinality up in a label-indexed system and you get:

- **Stream sprawl.** Thousands or millions of tiny streams, each with its own
  bookkeeping. The Quickwit/Loki benchmark counted 145,756 files on the Loki side
  versus 25 on Quickwit's — small files are death by a thousand object-store round
  trips.
- **Ingestion failures.** Per-tenant stream limits exist precisely because runaway
  cardinality can take the ingester down. Hit the limit and logs get dropped,
  usually the noisy ones you needed.
- **Slow wildcard queries.** Search across a field you _didn't_ make a label and
  the engine falls back to scanning chunk bodies. The benchmark's keyword search
  came back in 0.6s on Quickwit versus 9.3s on Loki; an analytics query, 2.1s
  versus 90s.
- **Pre-commitment.** Worst of all, the schema decision is made weeks before the
  incident, by someone guessing what they'll need.

## Why full-text plus columnar sidesteps it

Rootprint takes the other side of the trade. Under the hood it runs
[Quickwit](https://quickwit.io), which builds a real **inverted index** over your
log text and stores structured fields in a **columnar** layout — both written as
splits to your own object storage. There are no labels to ration, because there's
no label index to protect.

That means:

- **Every field is searchable, by default.** Full-text over the message, exact
  filters over structured fields, no "should this be a label" meeting. `request_id`,
  `trace_id`, IPs — search them directly.
- **Cardinality is a non-issue.** An inverted index doesn't care whether a field
  has five distinct values or five million; that's just the dictionary doing its
  job.
- **Histograms and filters come for free.** Columnar fields make
  count-over-time and field facets fast without you pre-declaring them as labels.

A query is just a query — full-text and structured filters together, no advance
planning about which dimension you're permitted to use:

```
service_name:checkout level:ERROR "connection reset"
```

## What you give up — stated honestly

This isn't free, and pretending otherwise would be the kind of marketing this
blog is trying not to be.

- **Ingest costs more.** Building an inverted index is real work. Expect higher
  CPU and slower indexing than a label-only system — Quickwit's benchmark put it
  around +80% CPU and roughly double the ingest time versus Loki. You're paying
  at write time for speed at read time.
- **The query language is leaner.** Quickwit favors keyword, phrase, and prefix
  queries. If you lean on Loki's LogQL for regex extraction and pipeline-style
  field parsing at query time, that's a capability you'd be trading away. Loki 3.0
  has also added bloom filters to chip at its own high-cardinality weak spot.
- **It's not a metrics store.** This is about searching logs you've kept, not
  replacing Prometheus.

For most teams the math is straightforward: you ingest once and query during
every incident, so paying at ingest to never think about cardinality again is a
trade worth making. The fields you reach for when something is on fire should
already be searchable — not stuck behind a budgeting decision you made last
quarter.
