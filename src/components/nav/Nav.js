import Observer from 'utils/Observer';

class Nav {

    constructor(element) {
        this._element = element;
        this._loadingContainer = document.querySelector('.loading-container');
        this._activeCategoryContainer = this._element.querySelector('.category-active-container');
        this._activeCategory = this._activeCategoryContainer.querySelector('.category-active');
        this._optionsContainer = this._element.querySelector('.category-options');
        this._categoryButtons = [...this._optionsContainer.querySelectorAll('[data-category]')];

        this._categoryButtons.forEach(button => {
            button.addEventListener('click', e => this._onClick(e));
        });

        this._activeCategoryContainer.addEventListener('click', () => this._onActiveCategoryClick())

    }

    _updateActiveCategory(activeHtml) {
        this._activeCategory.innerHTML = activeHtml
    }

    _onClick(e) {
        this._loadingContainer.style.display = 'block';

        this._updateActiveCategory(e.target.parentNode.innerHTML)

        const category = e.target.dataset.category;
        Observer.publish(this, 'categoryChanged', category);

        this._element.classList.remove('show-options');
    }

    _onActiveCategoryClick() {
        this._element.classList.toggle('show-options')
    }

}

export default Nav;