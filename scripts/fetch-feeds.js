// Haalt de RSS-feeds van nu.nl op en schrijft ze als JSON naar public/feeds/.
// Draait vóór elke build (en elk uur via GitHub Actions), zodat de site
// geen CORS-proxy nodig heeft.
import { mkdir, writeFile } from 'node:fs/promises';
import RSS from 'rss-parser';

const CATEGORIES = ['algemeen', 'tech', 'achterklap', 'wetenschap', 'sport', 'muziek', 'gezondheid', 'economie'];
const OUT_DIR = new URL('../public/feeds/', import.meta.url);

const parser = new RSS({ timeout: 15000 });
await mkdir(OUT_DIR, { recursive: true });

let failed = 0;
for (const category of CATEGORIES) {
    try {
        const feed = await parser.parseURL(`https://www.nu.nl/rss/${category}`);
        const data = {
            updated: new Date().toISOString(),
            items: feed.items.map(item => ({ title: item.title })),
        };
        await writeFile(new URL(`${category}.json`, OUT_DIR), JSON.stringify(data));
        console.log(`✓ ${category} (${data.items.length} koppen)`);
    } catch (error) {
        failed++;
        console.warn(`✗ ${category}: ${error.message}`);
    }
}

// Eén mislukte feed is geen ramp; als alles mislukt, faalt de build.
if (failed === CATEGORIES.length) {
    console.error('Geen enkele feed opgehaald.');
    process.exit(1);
}
