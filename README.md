# How to Extract Loom Video Transcripts in Node.js

Extract transcripts and metadata from public Loom videos using the [Loom Transcript Scraper](https://apify.com/devanshlive/loom-transcript-scraper) actor on Apify -- no browser automation or proxies required.

## What this example does

- Calls the Loom Transcript Scraper actor via the Apify client
- Passes Loom video URLs
- Waits for the run to complete
- Fetches results from the actor's dataset
- Prints each transcript to the console

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- An [Apify account](https://console.apify.com/sign-up) (free tier available)
- An [Apify API token](https://console.apify.com/settings/integrations)

## Installation

```bash
npm install
```

## Environment setup

```bash
cp .env.example .env
```

Open `.env` and replace `your_apify_token_here` with your actual Apify API token.

## Usage

```bash
npm start
```

## Code example

```javascript
import { ApifyClient } from 'apify-client';
import 'dotenv/config';

const client = new ApifyClient({
  token: process.env.APIFY_TOKEN,
});

const input = {
  startUrls: [
    { url: 'https://www.loom.com/share/912e89a68ccc42c5ab5096fec7cd63d6' },
  ],
};

const run = await client.actor('devanshlive/loom-transcript-scraper').call(input);

console.log('Results from dataset');
console.log(`Check your data here: https://console.apify.com/storage/datasets/${run.defaultDatasetId}`);
const { items } = await client.dataset(run.defaultDatasetId).listItems();
items.forEach((item) => {
  console.dir(item);
});
```

## Example output

See `sample-output.json` for a full example. Each result includes:

| Field | Description |
|-------|-------------|
| `loomId` | Loom video ID (32-character hex string) |
| `url` | Full Loom share URL |
| `title` | Video title as set by the creator |
| `creator` | Display name of the video creator |
| `uploadDateISO8601` | Upload timestamp in ISO 8601 format |
| `uploadDate` | Upload date (YYYY-MM-DD) |
| `durationISO8601` | Video duration in ISO 8601 format |
| `transcript` | Clean transcript text without timestamps |
| `transcriptVTT` | WebVTT format with full timestamps |
| `transcriptSRT` | SubRip format for subtitle editing |
| `error` | Error message if transcript extraction failed |

## Use cases

- **Accessibility compliance:** Generate transcripts for video content
- **Documentation:** Archive Loom video transcripts for knowledge bases
- **Content analysis:** Extract text from Loom videos for NLP pipelines
- **Meeting notes:** Convert Loom recordings into searchable text

## Try the actor on Apify

[Open the Loom Transcript Scraper on Apify](https://apify.com/devanshlive/loom-transcript-scraper)

## Related resources

- [Loom API documentation](https://dev.loom.com/)
- [Apify Client for JavaScript](https://docs.apify.com/api/client/js/)

## License

MIT
