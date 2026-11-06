import Observer from '../../static/js/utils/Observer'

class Blackout {
    constructor(element) {
        element.addEventListener('click', () => Observer.publish(this, 'blackout'))
    }
}

export default Blackout
