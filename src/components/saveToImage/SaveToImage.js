import Observer from 'utils/Observer'
import html2canvas from 'html2canvas'

class SaveToImage {
    constructor(element) {
        this._element = element
        this._element.addEventListener('click', () => this._onClick())
    }

    _onClick() {
        html2canvas(document.querySelector('#main'), {
            scale: 4
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