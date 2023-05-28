export default class Popup{
    constructor(selectorPopup){
        this._popup = document.querySelector(selectorPopup);
        this._popupCloseBtn = this._popup.querySelector('.popup__close');
    }
    open(){
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    close(){
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    _handleEscBtn = () => {
        this.close();
    }
    
    _handleClickBackground = (evt) => {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }
    setEventListeners(){
        this._popupCloseBtn.addEventListener('click', this._handleEscBtn);
        this._popup.addEventListener('click', this._handleClickBackground);
    }
}

