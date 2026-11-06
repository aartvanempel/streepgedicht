import Observer from '../../static/js/utils/Observer'
import Nav from '../nav/Nav'
import Blackout from '../blackout/Blackout'
import Reset from '../reset/Reset'
import Word from '../word/Word'
import Info from '../info/Info'
import SaveToImage from '../saveToImage/SaveToImage'

class View {
    constructor() {
        this._words = []
        this._loadingContainer = document.querySelector('.loading-container')
        this._errorContainer = document.querySelector('.error-container')
        this._contentContainer = document.querySelector('#content-container')
        this._contentParagraph = document.createElement('p')
        this._sourcesContainer = document.querySelector('.sources')
        this._sourcesList = this._sourcesContainer.querySelector('ol')

        this._init()
    }

    _init() {
        const nav = new Nav(document.querySelector('#nav'))
        const reset = new Reset(document.querySelector('#reset'))
        const blackout = new Blackout(document.querySelector('#blackout'))
        new Info()
        new SaveToImage(document.querySelector('#save-to-image'))

        Observer.subscribe(nav, 'categoryChanged', category => Observer.publish(this, 'onCategoryChanged', category))
        Observer.subscribe(reset, 'reset', () => Observer.publish(this, 'onReset'))
        Observer.subscribe(blackout, 'blackout', () => Observer.publish(this, 'onBlackout'))

        this._errorContainer.querySelector('button')
            .addEventListener('click', () => Observer.publish(this, 'onRetry'))
    }

    showLoading() {
        this._contentContainer.replaceChildren()
        this._errorContainer.hidden = true
        this._sourcesContainer.hidden = true
        this._loadingContainer.hidden = false
    }

    showError() {
        this._loadingContainer.hidden = true
        this._errorContainer.hidden = false
    }

    setContent(items) {
        this._words = items.map(item => {
            const word = new Word(item)
            Observer.subscribe(word, 'wordClick', () => Observer.publish(this, 'onWordClick', item))
            return word
        })

        this._contentParagraph.replaceChildren(...this._words.map(word => word.element))
        this._contentContainer.replaceChildren(this._contentParagraph)
        this._loadingContainer.hidden = true
    }

    // Laat alle woorden de huidige staat van het model tonen.
    update() {
        this._words.forEach(word => word.update())
    }

    setSources(sources) {
        this._sourcesList.replaceChildren(...sources.map(source => {
            const link = document.createElement('a')
            link.href = source.link
            link.target = '_blank'
            link.rel = 'noopener'
            link.textContent = source.title

            const item = document.createElement('li')
            item.appendChild(link)
            return item
        }))
        this._sourcesContainer.hidden = sources.length === 0
    }
}

export default View
