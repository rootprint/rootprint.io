<script lang="ts">
  import { WebsiteBaseUrl, WebsiteName } from "$lib/config";
  import {
    COMMITS_PER_MONTH,
    DEFAULTS,
    PRICES,
    VOLUME_STOPS,
    estimate,
    formatVolume,
    type CostInput,
  } from "$lib/cost";

  const title = `${WebsiteName} S3 cost calculator`;
  const description =
    "Estimate the monthly AWS S3 bill for running Rootprint: storage for your retention, PUT requests from ingest, and GET requests from search.";
  const canonical = `${WebsiteBaseUrl}/cost/`;
  const socialImage = `${WebsiteBaseUrl}/images/og-card.png`;

  const retention = new Map([
    [7, "7 days"],
    [30, "30 days"],
    [90, "90 days"],
    [182.5, "6 months"],
    [365, "12 months"],
    [730, "24 months"],
    [1095, "36 months"],
  ]);
  const retentionStops = [...retention.keys()];
  const retentionLabel = (days: number) => retention.get(days) ?? "";
  const searchStops = [0, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000];

  const knobs: {
    key: keyof CostInput;
    label: string;
    min: number;
    max?: number;
    step: number;
  }[] = [
    {
      key: "tracesPct",
      label: "Traces share of data (%)",
      min: 0,
      max: 100,
      step: 1,
    },
    { key: "logsRatio", label: "Logs compression (×)", min: 0.1, step: 0.1 },
    {
      key: "tracesRatio",
      label: "Traces compression (×)",
      min: 0.1,
      step: 0.1,
    },
    { key: "logEventBytes", label: "Avg log event (bytes)", min: 1, step: 1 },
    { key: "spanBytes", label: "Avg span (bytes)", min: 1, step: 1 },
  ];

  const input = $state({ ...DEFAULTS });
  const result = $derived(estimate(input));

  const usd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const usdFine = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 4,
  });
  const count = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
  const gb = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={socialImage} />
  <meta property="og:site_name" content={WebsiteName} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={socialImage} />
</svelte:head>

<!-- Each slider steps through `stops`, so every step changes the value. -->
{#snippet slider(
  id: string,
  label: string,
  key: keyof CostInput,
  stops: number[],
  format: (n: number) => string,
  hint?: string,
)}
  {@const text = format(input[key])}
  {@const i = stops.indexOf(input[key])}
  <div class="field">
    <div class="field-head">
      <label for={id}>{label}</label>
      <span class="value">{text}</span>
    </div>
    <input
      {id}
      type="range"
      min="0"
      max={stops.length - 1}
      step="1"
      aria-valuetext={text}
      style:--fill="{(i / (stops.length - 1)) * 100}%"
      bind:value={() => i, (v) => (input[key] = stops[v])}
    />
    <div class="scale muted" aria-hidden="true">
      <span>{format(stops[0])}</span><span
        >{format(stops[stops.length - 1])}</span
      >
    </div>
    {#if hint}<p class="hint muted">{hint}</p>{/if}
  </div>
{/snippet}

<div class="wrap">
  <header class="intro">
    <h1>{title}</h1>
    <p class="muted">{description}</p>
  </header>

  <div class="calc">
    <div class="inputs">
      {@render slider(
        "data",
        "Data ingested per month",
        "dataGB",
        VOLUME_STOPS,
        formatVolume,
        "Logs and traces uncompressed, what vendors bill as GB ingested.",
      )}
      {@render slider(
        "retention",
        "Retention",
        "retentionDays",
        retentionStops,
        retentionLabel,
      )}
      {@render slider(
        "searches",
        "Searches per day",
        "searchesPerDay",
        searchStops,
        count.format,
        "Log searches and trace views across your team.",
      )}

      <details class="assumptions hairline-t">
        <summary>Assumptions</summary>
        {#each knobs as knob (knob.key)}
          <div class="field">
            <label for={knob.key}>{knob.label}</label>
            <input
              id={knob.key}
              type="number"
              min={knob.min}
              max={knob.max}
              step={knob.step}
              bind:value={input[knob.key]}
            />
          </div>
        {/each}
      </details>
    </div>

    <div class="results">
      <div class="eyebrow">Estimated S3 bill per month</div>
      <output class="total">{usd.format(result.total)}</output>
      <p class="muted per-gb">
        {usdFine.format(result.perGB)} per GB ingested
      </p>

      <table>
        <thead>
          <tr>
            <th scope="col" class="eyebrow">Line</th>
            <th scope="col" class="eyebrow">Quantity</th>
            <th scope="col" class="eyebrow num">Per month</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row"
              >Storage<a href="#note-storage" class="muted">*</a></th
            >
            <td>
              {gb.format(result.storageGB)} GB stored
              <button
                type="button"
                class="tip"
                popovertarget="stored-tip"
                aria-label="How stored size is calculated">?</button
              >
              <div id="stored-tip" popover class="tip-box">
                Quickwit compresses logs and traces before writing them to S3,
                so your <span class="nowrap">{formatVolume(input.dataGB)}</span>
                a month takes up {gb.format(result.storedPerMonthGB)}&nbsp;GB.
                <span class="nowrap">{retentionLabel(input.retentionDays)}</span
                >
                of retention keeps {gb.format(result.storageGB)}&nbsp;GB in the
                bucket. You can change the compression ratios under Assumptions.
              </div>
            </td>
            <td class="num">{usd.format(result.storage)}</td>
          </tr>
          <tr>
            <th scope="row">Ingest</th>
            <td>{count.format(result.puts)} PUTs</td>
            <td class="num">{usd.format(result.put)}</td>
          </tr>
          <tr>
            <th scope="row"
              >Search<a href="#note-search" class="muted">**</a></th
            >
            <td>{count.format(result.searchGets)} GETs</td>
            <td class="num">{usd.format(result.search)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <section class="section method">
    <h2>How the estimate works</h2>
    <p>
      Rootprint keeps logs and traces in Quickwit indexes on your S3 bucket. You
      pay S3 for the bytes you keep, the requests that write them, and the
      requests that read them back.
    </p>

    <h3>Storage</h3>
    <p>
      Data per month × retention ÷ compression, priced through the S3 Standard
      tiers. Logs and traces compress at different ratios, and the defaults are
      averages: your data can compress better or worse. The estimate assumes a
      full retention window; until your bucket holds that much, you pay less.
    </p>

    <h3>Ingest</h3>
    <p>
      With continuous ingest, Quickwit's 5-second commit timeout produces about
      {count.format(COMMITS_PER_MONTH)} uploads a month per index. Empty intervals
      produce no uploads, so we cap initial uploads at the number of arriving log
      events or spans. At high volume, an index can reach its 10-million-document
      split target before the timeout and upload more often. Merging small files into
      larger ones adds about one PUT for every nine files.
    </p>

    <h3>Search</h3>
    <p>
      Each search reads small byte ranges from the index files it covers, so the
      GET count grows with your data and retention.
    </p>

    <h3>Prices</h3>
    <p>
      S3 Standard in {PRICES.region}.
    </p>
    <div class="prices">
      <table>
        <thead>
          <tr>
            <th scope="col" class="eyebrow">Item</th>
            <th scope="col" class="eyebrow">Price</th>
            <th scope="col" class="eyebrow">Per</th>
          </tr>
        </thead>
        <tbody>
          {#each PRICES.storageTiers as tier (tier.label)}
            <tr>
              <th scope="row">Storage, {tier.label}</th>
              <td>{usdFine.format(tier.perGB)}</td>
              <td class="muted">GB-month</td>
            </tr>
          {/each}
          <tr>
            <th scope="row">PUT, COPY, POST, LIST</th>
            <td>{usdFine.format(PRICES.putPer1k)}</td>
            <td class="muted">1,000 requests</td>
          </tr>
          <tr>
            <th scope="row">GET</th>
            <td>{usdFine.format(PRICES.getPer1k)}</td>
            <td class="muted">1,000 requests</td>
          </tr>
          <tr>
            <th scope="row">DELETE, transfer to EC2 in-region</th>
            <td>Free</td>
            <td class="muted"></td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3>Not included</h3>
    <p>
      Compute for Rootprint, Quickwit, and Postgres. Data transfer, which is
      free when searchers run in the bucket's region.
    </p>

    <div class="notes hairline-t muted">
      <p id="note-storage" class="anchor">
        * Compression depends on event shape, field count, and how repetitive
        your data is, so stored size can differ from this estimate. Adjust the
        ratios under Assumptions.
      </p>
      <p id="note-search" class="anchor">
        ** Search cost depends on how often your team searches, the time ranges
        they pick, and how often they open traces. Treat it as a rough figure.
      </p>
      <p>
        Sources: <a href="https://quickwit.io/docs/operating/aws-costs"
          >Quickwit: AWS costs</a
        >
        · <a href="https://aws.amazon.com/s3/pricing/">Amazon S3 pricing</a>
      </p>
    </div>
  </section>
</div>

<style>
  .intro {
    padding: 56px 0 36px;
  }

  .intro p {
    max-width: 72ch;
    margin-top: 20px;
    font-size: 15px;
  }

  .calc {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px solid var(--hairline);
    background: var(--base-200);
  }

  .inputs,
  .results {
    padding: 24px;
    min-width: 0;
  }

  .inputs {
    display: grid;
    gap: 24px;
    align-content: start;
    border-right: 1px solid var(--hairline);
  }

  .field {
    display: grid;
    gap: 6px;
  }

  label,
  summary {
    font-size: 13px;
  }

  input[type="number"] {
    width: 100%;
    height: 36px;
    padding: 0 10px;
    font: inherit;
    font-size: 14px;
    color: var(--base-content);
    background: var(--base-100);
    border: 1px solid var(--hairline-strong);
    border-radius: 0;
  }

  :is(input, button):focus-visible {
    outline: 2px solid var(--primary-strong);
    outline-offset: 2px;
  }

  .field-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
  }

  .value {
    font-size: 14px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }

  .scale {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
  }

  .hint {
    font-size: 12px;
  }

  input[type="range"] {
    width: 100%;
    height: 20px;
    margin: 0;
    background: transparent;
    appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    height: 4px;
    background: linear-gradient(
      to right,
      var(--primary-strong) var(--fill),
      var(--hairline-strong) var(--fill)
    );
  }

  input[type="range"]::-webkit-slider-thumb {
    width: 14px;
    height: 14px;
    margin-top: -5px;
    background: var(--ink);
    border: 0;
    border-radius: 0;
    -webkit-appearance: none;
  }

  input[type="range"]::-moz-range-track {
    height: 4px;
    background: var(--hairline-strong);
  }

  input[type="range"]::-moz-range-progress {
    height: 4px;
    background: var(--primary-strong);
  }

  input[type="range"]::-moz-range-thumb {
    width: 14px;
    height: 14px;
    background: var(--ink);
    border: 0;
    border-radius: 0;
  }

  .assumptions {
    padding-top: 16px;
  }

  .assumptions summary {
    cursor: pointer;
  }

  .assumptions[open] summary {
    margin-bottom: 16px;
  }

  .assumptions .field + .field {
    margin-top: 16px;
  }

  .total {
    display: block;
    margin-top: 8px;
    font-size: 40px;
    font-weight: 500;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }

  .per-gb {
    margin-top: 4px;
    font-size: 13px;
  }

  table {
    width: 100%;
    margin-top: 24px;
    border-collapse: collapse;
    font-size: 13px;
    font-variant-numeric: tabular-nums;
  }

  th,
  td {
    padding: 10px 0;
    text-align: left;
    vertical-align: baseline;
    font-weight: 400;
    border-top: 1px solid var(--hairline);
  }

  :is(th, td) + :is(th, td) {
    padding-left: 12px;
  }

  thead th {
    border-top: 0;
  }

  .num {
    text-align: right;
    white-space: nowrap;
  }

  /* Out of flow, so the button doesn't widen the Quantity column. */
  .tip {
    position: absolute;
    width: 16px;
    height: 16px;
    margin: 2px 0 0 8px;
    padding: 0;
    font: inherit;
    font-size: 11px;
    line-height: 14px;
    color: var(--base-content-muted);
    background: transparent;
    border: 1px solid var(--hairline-strong);
    border-radius: 0;
    cursor: pointer;
  }

  .nowrap {
    white-space: nowrap;
  }

  .tip:hover {
    color: var(--base-content);
  }

  .tip-box {
    width: min(300px, calc(100vw - 32px));
    padding: 12px;
    overflow: visible;
    font-size: 12px;
    line-height: 1.6;
    color: var(--base-content);
    background: var(--base-100);
    border: 1px solid var(--hairline-strong);
  }

  /* Without anchor positioning the popover stays centered in the viewport. */
  @supports (position-area: bottom) {
    .tip {
      anchor-name: --stored-tip;
    }

    .tip-box {
      position-anchor: --stored-tip;
      position-area: bottom;
      inset: auto;
      margin: 6px 16px 0;
    }
  }

  /* The calculator's own border already closes off the section above. */
  .method {
    border-top: 0;
  }

  .method h2 {
    font-size: 20px;
  }

  .method h3 {
    margin-top: 28px;
    font-size: 15px;
  }

  .method p {
    margin-top: 10px;
  }

  .method a {
    text-decoration: underline;
  }

  .prices {
    margin-top: 12px;
    padding: 0 16px;
    border: 1px solid var(--hairline);
    background: var(--base-200);
  }

  .prices table {
    margin-top: 0;
  }

  .notes {
    margin-top: 40px;
    padding-top: 16px;
  }

  .notes p {
    font-size: 12px;
  }

  @media (max-width: 720px) {
    .intro {
      padding-top: 40px;
    }

    .calc {
      grid-template-columns: 1fr;
    }

    .inputs {
      border-right: 0;
      border-bottom: 1px solid var(--hairline);
    }

    .inputs,
    .results {
      padding: 16px;
    }

    .total {
      font-size: 32px;
    }
  }
</style>
