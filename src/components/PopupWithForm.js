import Popup from './Popup.js';
export default class PopupWithForm extends Popup{
    constructor(selectorPopup, submitForm){
        super(selectorPopup);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
    }
    _getInputValues(){
        this._input = {};
        this._inputList.forEach(item => {
            this._input[item.name] = item.value;
        });
        return this._input
    }
    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) =>{
            evt.preventDefault();
            this._submitForm(this._getInputValues());
        })
    }
    setInputInfo(info){
        this._inputList.forEach(item => {
            item.value = info[item.name];
        });
    }
    close(){
        super.close();
        this._form.reset();
    }
}