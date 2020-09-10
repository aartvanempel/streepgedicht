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

    static processedData(data) {
        return data.items
            .slice(0, 7)
            .map(entry => {
                return (
                    entry.title
                        .replace("Achterklap-updates", "")
                        .replace("Podcast", "")
                        .replace("Video", "")
                        .replace("Weerbericht", "")
                        .replace("Liveblog", "")
                        .replace("Transferupdates", "")
                        .replace("NUcheckt", "")
                        .replace(/[,()"':|]/g, '') // remove unwanted chars
                        .replace(/\s+/g, ' ') // remove double spaces
                        .trim() + ' ●'
                )
            })
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