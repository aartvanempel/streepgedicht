import Word from 'word/Word';

class Content {

    constructor(model) {
        this._model = model;
        this._contentContainer = document.querySelector('.content-container');

        this.showContent(this._model.collection);
    }

    showContent(collection) {
        this._contentContainer.innerHTML = '';

        collection.forEach(object => {
            const wordElement = document.createElement('span');
            wordElement.innerText = object.label;

            new Word(this._model, wordElement, object);

            this._contentContainer.appendChild(wordElement);
        });
    }

    reset() {
        this._model.collection.forEach(object => object.selected = false);
        this.showContent(this._model.collection);
    }

}

export default Content;