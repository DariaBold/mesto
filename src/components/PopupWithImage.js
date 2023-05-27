import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(selectorPopup){
        super(selectorPopup);
        this._popupPhotoImage = this._popup.querySelector('.popup__image');
        this._popupPhotoDescription = this._popup.querySelector('.popup__description');
    }
    open = (data) => {
        this._popupPhotoImage.src = data.link;
        this._popupPhotoImage.alt = data.name;
        this._popupPhotoDescription.textContent = data.name;
        super.open();
    }
}
