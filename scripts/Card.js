class Card {
    constructor(data, cardTemplate, openPopup){
        this._data = data;
        this._link = data.link;
        this._name = data.name;
        this._cardTemplate = cardTemplate;
        this._openPopup = openPopup;
    }
    _getTemplete(){
        this._cardElement = document
        .querySelector
        (this._cardTemplate)
        .content
        .querySelector('.elements__card')
        .cloneNode(true);
        return this._cardElement;
    }
    _setListenerLike(evt){
        if (evt.target.classList.contains('elements__like')) {
            evt.target.classList.toggle('elements__like_active');
        };
    }
    _setListenerTrash(evt){
        evt.target.closest(".elements__card").remove();
    }
    _setListenerPopupPhotoImage = () => {
        this._popupPhotoImage.src =  this._link;
        this._popupPhotoImage.alt =  this._name; 
        this._popupPhoto.querySelector('.popup__description').textContent = this._name;
        this._openPopup(this._popupPhoto);
    }
    _setListeners(){
        this._trashElemnt.addEventListener('click',this._setListenerTrash);
        this._likeElemnt.addEventListener('click', this._setListenerLike);
        this._cardImage.addEventListener('click', this._setListenerPopupPhotoImage);
    }
    createCard(){
        this._cloneCard = this._getTemplete();
        this._cardImage = this._cloneCard.querySelector('.elements__image');
        this._titleElement = this._cloneCard.querySelector('.elements__title');
        this._trashElemnt = this._cloneCard.querySelector('.elements__trash');
        this._likeElemnt = this._cloneCard.querySelector('.elements__like');
        this._popupPhoto = document.querySelector('#photo');
        this._popupPhotoImage =  this._popupPhoto.querySelector('.popup__image');
        this._cardImage.src = this._link;
        this._cardImage.alt =this._name;
        this._titleElement.textContent = this._name;
        this._setListeners();
        return this._cloneCard;
    }
    
}
export default Card;