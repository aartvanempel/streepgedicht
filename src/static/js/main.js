import '../scss/all.scss';
import './icons';
import Model from '../../components/model/Model';
import View from '../../components/view/View';
import Controller from '../../components/controller/Controller';

document.addEventListener('DOMContentLoaded', () => {
    const model = new Model();
    const view = new View();
    new Controller(model, view);
});
