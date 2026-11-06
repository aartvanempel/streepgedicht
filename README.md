# Streepgedicht

Maak een digitaal streepgedicht gebaseerd op koppen van nu.nl.

Live: [aartvanempel.github.io/streepgedicht](https://aartvanempel.github.io/streepgedicht/)

## Lokaal draaien

Je hebt Node.js 20 of nieuwer nodig.

```bash
npm install
npm run dev
```

Open daarna http://localhost:5173.

## Hoe het werkt

- `scripts/fetch-feeds.js` haalt de RSS-feeds van nu.nl op en schrijft ze als JSON naar `public/feeds/`. Dit gebeurt automatisch vóór `npm run dev` en `npm run build`, en kan los met `npm run feeds`.
- De site leest die JSON-bestanden, dus er is geen CORS-proxy nodig.
- `npm run build` zet de complete site in `dist/`.

## Publiceren

De workflow in `.github/workflows/deploy.yml` bouwt en publiceert de site op GitHub Pages bij elke push, en daarnaast elk uur zodat de koppen actueel blijven.

Eenmalig instellen: zet in GitHub onder **Settings → Pages → Source** de bron op **GitHub Actions**.

Let op: GitHub zet geplande workflows uit als er 60 dagen niets in de repo is gebeurd. De site blijft dan werken, maar de koppen worden niet meer ververst. Je krijgt hierover een mail en kunt de workflow met één klik weer aanzetten (tabblad **Actions**).
