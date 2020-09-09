import Observer from 'utils/Observer';

class Nav {

    constructor(element) {
        this._element = element;
        this._categoryButtons = [...this._element.querySelectorAll('[data-category]')];

        this._categoryButtons.forEach(button => {
            button.addEventListener('click', e => this._onClick(e));
        });
    }

    _onClick(e) {
        document.querySelector('.loading-container').style.display = 'block';
        
        const category = e.target.dataset.category;
        Observer.publish(this, 'categoryChanged', category);
    }

}

export default Nav;