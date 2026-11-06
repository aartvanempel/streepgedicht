// De feeds worden tijdens de build opgehaald (scripts/fetch-feeds.js)
// en staan als JSON naast de site.
export async function getFeed(category) {
    // 'no-cache': altijd bij de server navragen of er een nieuwere versie is.
    // GitHub Pages laat browsers bestanden anders 10 minuten blind hergebruiken.
    const response = await fetch(`${import.meta.env.BASE_URL}feeds/${category}.json`, { cache: 'no-cache' });
    if (!response.ok) {
        throw new Error(`Feed '${category}' niet gevonden (${response.status})`);
    }
    return response.json();
}
