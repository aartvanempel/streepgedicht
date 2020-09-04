import Observer from 'utils/Observer'

class Controller {
    constructor(model, view) {
        this._model = model
        this._view = view
        this._category = 'achterklap'

        this._init()
    }

    _init() {
        this._render(this._category)

        Observer.subscribe(this._view, 'onReset', () => this._model.reset())
        Observer.subscribe(this._view, 'onBlackout', () => this._model.selectAll())
        Observer.subscribe(this._view, 'onWordClick', item => this._model.toggleSelected(item))
        Observer.subscribe(this._view, 'onCategoryChanged', category => this._render(category))
    }

    async _render(category) {
        const data = await this._model.getData(category)
        this._view.setContent(data)
    }
}

export default Controller