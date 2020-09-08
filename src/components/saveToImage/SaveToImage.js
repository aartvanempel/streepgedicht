import Observer from 'utils/Observer'
import html2canvas from 'html2canvas'
import { transformFile } from 'babel-core'

class SaveToImage {
    constructor(element) {
        this._element = element
        this._element.addEventListener('click', () => this._onClick())
    }

    _onClick() {
        html2canvas(document.querySelector('#main'), {
            onclone: clonedDoc => {
                clonedDoc.getElementById('tag-container').style.opacity = 1;
            },
            scale: 6
        }).then(canvas => {
                const getFullCanvas = canvas;
                const link = document.createElement('a');

                link.href = getFullCanvas.toDataURL("image/png");
                link.download = 'streepgedicht.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
    }
}

export default SaveToImage