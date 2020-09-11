import { getFeed } from 'utils/utils'

class Model {
    constructor(url) {
        this._url = url
    }

    async getData(category) {
        const response = await getFeed(this._url + category)

        this._data = Model.processedData(response)

        return this._data
    }

    static cleanUpTitle(title) {
        return (
            title
                .replace("Achterklap-updates", "")
                .replace("Podcast", "")
                .replace("Video", "")
                .replace("Weerbericht", "")
                .replace("Liveblog", "")
                .replace("Transferupdates", "")
                .replace("NUcheckt", "")
                .replace("NUjij", "")
                .replace(/[’,()"':|?!]/g, '') // remove unwanted chars
                .replace(/\s+/g, ' ') // remove double spaces
        )
    }

    static processedData(data) {
        return data.items
            .slice(0, 7)
            .map((entry, index) => index < 6 ? Model.cleanUpTitle(entry.title).trim() + ' ●' : Model.cleanUpTitle(entry.title)) // add circle to end of title expect for last title
            .join(' ')
            .split(' ')
            .map(text => ({ label: text, selected: false }))
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