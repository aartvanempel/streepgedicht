import Observer from 'utils/Observer'
import html2canvas from 'html2canvas'
import { transformFile } from 'babel-core'

class SaveToImage {
    constructor(element) {
        this._element = element
        this._element.addEventListener('click', () => this._onClick())
    }

    _onClick() {
        window.scrollTo(0, 0);

        const newWindow = window.open(window.location.href)

            html2canvas(document.querySelector('#main'), {
                onclone: clonedDoc => {
                    const el = clonedDoc.getElementById('tag-container');
                    el.style.opacity = 1;
                },
                scale: 6
            }).then(canvas => {
                newWindow.location.href = canvas.toDataURL("image/png");
                newWindow.focus();
            });
    }
}

export default SaveToImage