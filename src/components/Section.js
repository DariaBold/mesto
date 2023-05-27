export default class Section{
    constructor({ items, renderer }, selector){
        this._items = items;
        this._selector = document.querySelector(selector);
        this.renderer = renderer;
    }

    addCard(){
        this._items.forEach ((el) => {
            this.addItem(this.renderer(el));
        })
    }
    addItem(elementDOM){
        this._selector.prepend(elementDOM);
    }
}
