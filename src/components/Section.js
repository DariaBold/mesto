export default class Section{
    constructor({ renderer }, selector){
        this._selector = document.querySelector(selector);
        this._renderer = renderer;
    }
    addCard(items){
        items.forEach ((el) => {
            this._renderer(el);
        })
    }
    addItem(elementDOM){
        this._selector.prepend(elementDOM);
    }
}
