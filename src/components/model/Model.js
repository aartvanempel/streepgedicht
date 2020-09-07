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
            .slice(0, 6)
            .map(entry => entry.title.replace("Achterklap-updates", "").replace(/[.,()"':|]/g, '').trim())
            .join(' ')
            .split(' ')
            .map(text => ({label: text, selected: false}))
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