import Observer from '../../static/js/utils/Observer';

// Eén woord van het gedicht. Een knop, zodat je hem ook met het toetsenbord
// kunt wegstrepen. De weergave volgt altijd item.selected uit het model.
class Word {
    constructor(item) {
        this._item = item;
        this._element = document.createElement('button');
        this._element.type = 'button';
        this._element.className = 'word';
        this._element.textContent = item.label;
        this._element.addEventListener('click', () => Observer.publish(this, 'wordClick'));
        this.update();
    }

    update() {
        this._element.classList.toggle('blackout', this._item.selected);
        this._element.setAttribute('aria-pressed', String(this._item.selected));
    }

    get element() {
        return this._element;
    }
}

export default Word;
