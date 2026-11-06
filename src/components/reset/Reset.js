import Observer from '../../static/js/utils/Observer'

class Reset {
    constructor(element) {
        element.addEventListener('click', () => Observer.publish(this, 'reset'))
    }
}

export default Reset
