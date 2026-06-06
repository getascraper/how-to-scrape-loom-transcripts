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
