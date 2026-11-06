// Het "Over ons"-venster. Sluit met de sluitknop, de achtergrond of Escape,
// en zet de focus terug op de knop waarmee het geopend werd.
class Info {
    constructor() {
        this._button = document.querySelector('.info');
        this._overlay = document.querySelector('.info-overlay');
        this._closeButton = this._overlay.querySelector('.close');

        this._button.addEventListener('click', () => this._isOpen() ? this._close() : this._open());
        this._closeButton.addEventListener('click', () => this._close());
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && this._isOpen()) this._close();
        });
    }

    _isOpen() {
        return this._overlay.classList.contains('open');
    }

    _open() {
        this._button.classList.add('open');
        this._button.setAttribute('aria-expanded', 'true');
        this._overlay.classList.add('open');
        this._closeButton.focus();
    }

    _close() {
        this._button.classList.remove('open');
        this._button.setAttribute('aria-expanded', 'false');
        this._overlay.classList.remove('open');
        this._button.focus();
    }
}

export default Info;
