import Observer from '../../static/js/utils/Observer';

class Nav {
    constructor(element) {
        this._element = element;
        this._activeCategoryContainer = this._element.querySelector('.category-active-container');
        this._activeCategory = this._activeCategoryContainer.querySelector('.category-active');
        this._optionsContainer = this._element.querySelector('.category-options');

        this._optionsContainer.querySelectorAll('[data-category]').forEach(button => {
            button.addEventListener('click', e => this._onClick(e));
        });

        this._activeCategoryContainer.addEventListener('click', () => this._setOpen(!this._isOpen()));
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && this._isOpen()) {
                this._setOpen(false);
                this._toggleButton().focus();
            }
        });
    }

    // De knop met de huidige categorie; die opent en sluit het menu.
    _toggleButton() {
        return this._activeCategory.querySelector('button');
    }

    _isOpen() {
        return this._element.classList.contains('show-options');
    }

    _setOpen(open) {
        this._element.classList.toggle('show-options', open);
        this._toggleButton().setAttribute('aria-expanded', String(open));
    }

    _onClick(e) {
        const option = e.currentTarget;

        // Neem icoon en naam van de gekozen optie over in de knop bovenaan.
        this._activeCategory.innerHTML = option.parentNode.innerHTML;
        const toggle = this._toggleButton();
        toggle.removeAttribute('data-category');
        toggle.setAttribute('aria-controls', this._optionsContainer.id);

        Observer.publish(this, 'categoryChanged', option.dataset.category);

        this._setOpen(false);
        toggle.focus();
    }
}

export default Nav;
