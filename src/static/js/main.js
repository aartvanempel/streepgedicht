import Model from 'model/Model';
import View from 'view/View';
import Controller from 'controller/Controller';

document.addEventListener('DOMContentLoaded', () => {
    const model = new Model('https://www.nu.nl/rss/');
    const view = new View();
    new Controller(model, view);
});