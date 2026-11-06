class SaveToImage {
    constructor(element) {
        this._element = element
        this._element.addEventListener('click', () => this._onClick())
    }

    async _onClick() {
        // Pas laden als het nodig is: html2canvas is het grootste deel van de bundel.
        const { default: html2canvas } = await import('html2canvas');
        window.scrollTo(0, 0);
        html2canvas(document.querySelector('#main'), {
            onclone: clonedDoc => {
                const el = clonedDoc.getElementById('tag-container');
                el.style.opacity = 1;
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