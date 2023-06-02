class Card {
    constructor(data, cardTemplate, handleCardClick, clickLike, deleteCard){
        this._data = data;
        this._link = data.link;
        this._name = data.name;
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick;
        this._otherId = data.owner._id;
        this._myId = data.myId;
        this._likes = data.likes;
        this._likesCount = data.likes.length;
        this._clickLike = clickLike;
        this._cardId = data._id;
        this._deleteCard = deleteCard;
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
    _setListenerLike = () => {
        this._clickLike(this._likeElement, this._cardId)
    }
    _setListenerTrash = () =>{
        this._deleteCard(this._cardId);
    }
    _findCountsLikes(){
        this._likes.forEach(count => {
            if(count._id === this._myId){
                this._likeElement.classList.add('elements__like_active');
            }
        });
        this._counter.textContent = this._likesCount;
    }
    findClickLikes(likes){
        this._likeElement.classList.toggle('elements__like_active');
        this._counter.textContent = likes.length;
    }
    deleteCardFromHtml = () => {
        this._cloneCard.remove();
        this._cloneCard = null;
    }
    _setListenerPopupPhotoImage = () => {
        this._handleCardClick(this._data);
    }
    _setListeners(){
        this._trashElement.addEventListener('click',this._setListenerTrash);
        this._likeElement.addEventListener('click', this._setListenerLike);
        this._cardImage.addEventListener('click', this._setListenerPopupPhotoImage);
    }
    createCard(){
        this._cloneCard = this._getTemplete();
        this._cardImage = this._cloneCard.querySelector('.elements__image');
        this._titleElement = this._cloneCard.querySelector('.elements__title');
        this._trashElement = this._cloneCard.querySelector('.elements__trash');
        this._likeElement = this._cloneCard.querySelector('.elements__like');
        this._counter =this._cloneCard.querySelector('.elements__counter');
        this._cardImage.src = this._link;
        this._cardImage.alt =this._name;
        this._titleElement.textContent = this._name;
        this._setListeners();
        this._findCountsLikes();
        if(this._otherId != this._myId){
            this._trashElement.remove();
        }
        return this._cloneCard;
    }
    
}
export default Card;