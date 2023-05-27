import Popup from './Popup.js';
export default class PopupWithForm extends Popup{
    constructor(selectorPopup, submitForm){
        super(selectorPopup);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
    }
    getInputValues(){
        this._input = {};
        this._inputList.forEach(item => {
            this._input[item.name] = item.value;
        });
        return this._input
    }
    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitForm);
    }

    close(){
        super.close();
        this._form.reset();
    }
}