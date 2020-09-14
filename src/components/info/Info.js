import Observer from 'utils/Observer';

class Info {
    constructor() {
        this._infoIcon = document.querySelector('.info');
        this._infoOverlay = document.querySelector('.info-overlay');
        this._closeIcon = this._infoOverlay.querySelector('.close')

        this._infoIcon.addEventListener('click', () => this._toggleInfo());
        this._closeIcon.addEventListener('click', () => this._toggleInfo());
    }

    _toggleInfo() {
        this._infoIcon.classList.toggle('open');
        this._infoOverlay.classList.toggle('open')
    }

}

export default Info;