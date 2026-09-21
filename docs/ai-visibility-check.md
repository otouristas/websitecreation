# AI visibility check (one keyword, three surfaces)

Lives at `/[locale]/ai-visibility-check`, in both languages. A visitor types a
keyword and, optionally, their domain; the page renders three panels for that
one query - the Google organic results, the AI Overview above them, and what
ChatGPT answers - with their domain marked wherever it appears.

It is the live version of the homepage section `AiSearchSplit`, which tells the
same story with a fixed tourism example. That section now links here, and the
worked example is what the tool shows before the first run, labelled as a
sample.

## Why a page rather than a widget in the hero

Every check is a paid upstream call. A keyword box in the hero would be run by
every bot and every idle visitor; a page with a heading and an explanation is
run by people who want the answer. The homepage keeps its free, illustrative
version.

## What it calls

| Panel | Endpoint | Notes |
| --- | --- | --- |
| Google + AI Overview | `POST /v3/serp/google/organic/live/advanced` | one call; the AI Overview arrives as an `ai_overview` item alongside the organic ones |
| ChatGPT | `POST /v3/ai_optimization/chat_gpt/llm_responses/live` | `web_search: true`, so the answer cites pages it actually retrieved |

Both are DataForSEO live endpoints - one request, one answer, no task polling.
They run in parallel behind `POST /api/search-preview`. The SERP call is the
backbone: if it fails the check fails. If the chat call fails, that panel says
so and the other two still render.

`load_async_ai_overview: true` is set on the SERP call. Google streams the
overview in after the page loads, so without it only a cached overview is ever
returned. It costs $0.002 extra per request.

The keyword is sent URL-encoded on purpose: DataForSEO decodes every `%##` in
the field and turns a literal `+` into a space, so the encoded form is the only
one that round-trips intact.

## Configuration

| Variable | Default | What it does |
| --- | --- | --- |
| `DATAFORSEO_LOGIN` | - | required |
| `DATAFORSEO_PASSWORD` | - | required |
| `DATAFORSEO_CHATGPT_MODEL` | `gpt-4.1-mini` | model for the chat panel; `GET /v3/ai_optimization/chat_gpt/llm_responses/models` lists the valid names |
| `SEARCH_PREVIEW_DAILY_LIMIT` | `120` | live checks per day across all visitors |

Without credentials the route answers `503 {"error":"unconfigured"}` and the
page shows its worked example plus a line saying live checks are off. Nothing
breaks, and the page still earns its keyword.

## Cost control

A check is roughly three cents: the SERP call plus the ChatGPT call with web
search. Four guards, all in module memory in `src/app/api/search-preview/route.ts`:

- a 12-hour cache keyed by keyword + market + domain, so re-runs are free;
- six checks per IP per hour;
- the daily ceiling above, after which the tool says the free checks are used
  up rather than quietly emptying the account;
- an 80-character, 12-word cap on the keyword, which is also what stops the
  ChatGPT call being used as a free LLM on our account.

On a serverless platform each instance keeps its own maps, so the real ceiling
is per instance. That is the right trade for a lead magnet and the wrong one
for a billing control - if the account ever needs a hard cap, it belongs in
DataForSEO's own spending limits, not here.

## Reading the result

- **Google.** The top four organic results. If the tracked domain ranks below
  them, its row is appended with its real position, because "you are 9th" is
  still the answer to "am I there?".
- **AI Overview.** Absent on plenty of queries, and that absence is reported as
  a finding rather than an error: for that query the classic result still owns
  the answer.
- **ChatGPT.** The keyword goes to the model verbatim - the question is what
  ChatGPT says when someone types this, so anything wrapped around it would be
  a different question. A system message only fixes the language and the
  length. Inline `([domain](url))` citation markers are stripped from the prose
  because the same sources are rendered as chips underneath.

A domain matches its own subdomains, so a booking subdomain counts as the
client.

## What it deliberately does not claim

One check is one reading. AI answers vary per user, per session and per day,
and no engine guarantees a citation. The page says so twice, and the tracking
that turns a reading into a trend is the retainer, not this page.
