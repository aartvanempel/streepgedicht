import Observer from 'utils/Observer';

class Word {
    constructor(options) {
        this._element = document.createElement('span');
        this._element.textContent = options.label;
        this._element.addEventListener('click', () => this._onClick());
    }

    _onClick() {
        this._element.classList.toggle('blackout');
        Observer.publish(this, 'wordClick');
    }

    get element() {
        return this._element;
    }

}

export default Word;