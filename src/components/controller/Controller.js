import Observer from '../../static/js/utils/Observer'

class Controller {
    constructor(model, view) {
        this._model = model
        this._view = view
        this._category = 'achterklap'
        this._requestId = 0

        this._init()
    }

    _init() {
        this._render(this._category)

        Observer.subscribe(this._view, 'onReset', () => this._model.reset())
        Observer.subscribe(this._view, 'onBlackout', () => this._model.selectAll())
        Observer.subscribe(this._view, 'onWordClick', item => this._model.toggleSelected(item))
        Observer.subscribe(this._view, 'onCategoryChanged', category => this._render(category))
        Observer.subscribe(this._view, 'onRetry', () => this._render(this._category))
    }

    async _render(category) {
        this._category = category
        // Alleen het antwoord op het laatste verzoek telt, zodat een trage
        // eerdere categorie een nieuwere niet overschrijft.
        const requestId = ++this._requestId
        this._view.showLoading()

        try {
            const { words, sources } = await this._model.getData(category)
            if (requestId !== this._requestId) return
            this._model.setData(words)
            this._view.setContent(words)
            this._view.setSources(sources)
        } catch (error) {
            if (requestId !== this._requestId) return
            console.error(error)
            this._view.showError()
        }
    }
}

export default Controller
