import Observer from 'utils/Observer'

class Blackout {
    constructor(element) {
        this._element = element
        this._element.addEventListener('click', () => this._onClick())
    }

    _onClick() {
        const wordElements = Array.from(document.querySelectorAll('#content-container span'))
        wordElements.forEach(element => element.classList.add('blackout'))

        Observer.publish(this, 'blackout')
    }
}

export default Blackout