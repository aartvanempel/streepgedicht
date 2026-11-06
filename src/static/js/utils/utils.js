// De feeds worden tijdens de build opgehaald (scripts/fetch-feeds.js)
// en staan als JSON naast de site.
export async function getFeed(category) {
    const response = await fetch(`${import.meta.env.BASE_URL}feeds/${category}.json`);
    if (!response.ok) {
        throw new Error(`Feed '${category}' niet gevonden (${response.status})`);
    }
    return response.json();
}
