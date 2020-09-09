import Observer from 'utils/Observer'
import Nav from 'nav/Nav'
import Blackout from 'blackout/Blackout'
import Reset from 'reset/Reset'
import Word from 'word/Word'
import SaveToImage from 'saveToImage/SaveToImage'

class View {
    constructor() {
        this._data = null
        this._loadingContainer = document.querySelector('.loading-container')
        this._contentContainer = document.querySelector('.content-container')
        this._contentParagraph = document.createElement('p')

        this._init()
    }

    _init() {
        const nav = new Nav(document.querySelector('#nav'))
        const reset = new Reset(document.querySelector('#reset'))
        const blackout = new Blackout(document.querySelector('#blackout'))
        new SaveToImage(document.querySelector('#save-to-image'))

        Observer.subscribe(nav, 'categoryChanged', category => Observer.publish(this, 'onCategoryChanged', category))
        Observer.subscribe(reset, 'reset', () => Observer.publish(this, 'onReset'))
        Observer.subscribe(blackout, 'blackout', () => Observer.publish(this, 'onBlackout'))
    }

    setContent(data) {
        this._data = data
        this._contentParagraph.innerHTML = ''
        const documentFragment = document.createDocumentFragment()

        this._data.forEach(item => {
            const word = new Word(item)
            Observer.subscribe(word, 'wordClick', () => Observer.publish(this, 'onWordClick', item))
            documentFragment.appendChild(word.element)
        })

        this._contentParagraph.appendChild(documentFragment)
        this._contentContainer.prepend(this._contentParagraph)

        this._loadingContainer.style.display = 'none';
    }
}

export default View