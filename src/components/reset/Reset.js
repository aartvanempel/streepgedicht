import Observer from 'utils/Observer'

class Reset {

    constructor(element) {
        this._element = element
        this._element.addEventListener('click', () => this._onClick())
    }

    _onClick() {
        const wordElements = Array.from(document.querySelectorAll('#content-container span'))

        wordElements.forEach(element => element.classList.remove('blackout'))
        Observer.publish(this, 'reset')
    }
}

export default Reset