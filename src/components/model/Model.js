import { getFeed } from '../../static/js/utils/utils'

const ITEMS = 7

// Labels die nu.nl voor een kop zet (bijv. "Video | ..."). Alleen als los woord
// verwijderd, zodat bijvoorbeeld "Videoclip" heel blijft.
const LABELS = ['Achterklap-updates', 'Podcast', 'Video', 'Weerbericht', 'Liveblog', 'Transferupdates', 'NUcheckt', 'NUjij']
const LABEL_PATTERN = new RegExp(`(^|\\s)(${LABELS.join('|')})(?=[\\s:|]|$)`, 'g')

class Model {
    constructor() {
        this._data = []
    }

    async getData(category) {
        const response = await getFeed(category)
        const items = response.items.slice(0, ITEMS)
        return {
            words: Model.processedData(items),
            sources: items.filter(item => item.link),
        }
    }

    setData(data) {
        this._data = data
    }

    static cleanUpTitle(title) {
        return title
            .replace(LABEL_PATTERN, '$1')
            .replace(/[()"“”:|?!]/g, '')               // leestekens die het gedicht rommelig maken
            .replace(/['‘’](?!\p{L})|(?<!\p{L})['‘’]/gu, '') // aanhalingstekens weg, maar "auto's" blijft heel
            .replace(/,(?!\d)/g, '')                     // komma's weg, behalve in getallen (1,5)
            .replace(/\s+/g, ' ')
            .trim()
    }

    // Alle koppen achter elkaar, gescheiden door een bolletje, als losse woorden.
    static processedData(items) {
        return items
            .map(item => Model.cleanUpTitle(item.title))
            .filter(Boolean)
            .join(' ● ')
            .split(' ')
            .map(label => ({ label, selected: false }))
    }

    toggleSelected(item) {
        item.selected = !item.selected
    }

    selectAll() {
        this._data.forEach(word => word.selected = true)
    }

    reset() {
        this._data.forEach(word => word.selected = false)
    }
}

export default Model
