import './index.css'; 
import Card from '../components/Card.js';
import FormValidation from '../components/FormValidator.js';
import PopupWithImage from '../components/PicturePopup.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api';
import Popup from '../components/Popup';
import {
    formElementEdit,
    buttonOpenEditProfile,
    buttonOpenAddPopup,
    formElement,
    formElementAdd,
    cardTemplate,
    popupProfileId,
    popupAddId,
    popupImage,
    section,
    userInformation,
    variables,
    formElementAvatar,
    clickOpenAvatarPopup,
    popupAvatarId,
    popupQuestionId,
    formElementQuestion
} from '../utils/constants.js';

const userInfo = new UserInfo(userInformation);

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
      authorization: '19e8582c-87a0-4169-b9b7-3f64cd5f6ca3',
      'Content-Type': 'application/json'
    }
  });

const validationCheckAdd = new FormValidation(variables, formElementAdd);
const validationCheckEdit = new FormValidation(variables, formElementEdit);
const validationCheckAvatar = new FormValidation(variables, formElementAvatar);
validationCheckAdd.enableValidation();
validationCheckEdit.enableValidation();
validationCheckAvatar.enableValidation();

function initPopupEditSubmit() {
    popupProfEdit.setInputInfo(userInfo.getUserInfo());
    popupProfEdit.open();
    validationCheckEdit.resetValidation();
}
function initPopupAvatarSubmit(){
    popupAvatar.open();
    validationCheckAvatar.resetValidation();
}


const popupProfEdit = new PopupWithForm(popupProfileId, (form) => {
    renderLoading(true, formElement);
    api.setUserInfo(form)
        .then(res => {userInfo.setUserInfo({
            name: res.name,
            description: res.about, 
            avatar: res.avatar
        })
        popupProfEdit.close();
    })
        .catch((error => console.error(`Ошибка редактирования профиля ${error}`)))
        .finally(()=>{
            renderLoading(true, formElement);
        })
    
})

const popupAvatar = new PopupWithForm(popupAvatarId, (form) => {
    renderLoading(true, formElementAvatar);
    api.setUserAvatar(form)
        .then(res => {
            userInfo.setUserInfo({
            name: res.name,
            description: res.about, 
            avatar: res.avatar
        })
        popupAvatar.close();
    })
    .catch((error => console.error(`Ошибка редактирования аватара ${error}`)))
    .finally(()=>{
        renderLoading(false, formElementAvatar);
    });
})

popupProfEdit.setEventListeners();
popupAvatar.setEventListeners();
const popupImageOpen = new PopupWithImage(popupImage);
popupImageOpen.setEventListeners();

let userId;

Promise.all([api.getUserInfo(),api.getInitialCards()])
    .then(([user, cards]) =>{
        userId = user._id;
        cards.forEach(element => {
            element.myId = user._id;
        });
        userInfo.setUserInfo({
            name: user.name,
            description: user.about, avatar: user.avatar
        });
        cardCreate.addCard(cards);
    })
    .catch((error => console.error(`Ошибка создания карточки ${error}`)))

const popupQuestion = new Popup(popupQuestionId);
function createCard(el) {
    const card = new Card(el, cardTemplate, popupImageOpen.open, (likeElement, cardId) =>{
        const likeElementCard = 'elements__like_active';
        if(likeElement.classList.contains(likeElementCard)){
            api.deleteLike(cardId)
                .then(res =>{
                    card.findClickLikes(res.likes);
                })
                .catch((error => console.error(`Ошибка удаления лайка ${error}`)));
        } else {
            api.putLike(cardId)
                .then(res =>{
                    card.findClickLikes(res.likes);
                })
                .catch((error => console.error(`Ошибка добавления лайка ${error}`)));
        }
    }, (cardId)=>{
        function deleteCard(evt) {
            renderLoading(true, formElementQuestion);
            evt.preventDefault();
            api.deleteCard(cardId)
                .then((res) => {
                    card.deleteCardFromHtml();
                    popupQuestion.close();
                    console.log(res);
                })
                .catch((error => console.error(`Ошибка удаления карточки ${error}`)))
                .finally(()=>{
                    renderLoading(false, formElementQuestion);
                    formElementQuestion.removeEventListener('submit', deleteCard);
                });
        }
        
        popupQuestion.open = function(){
            this._popup.classList.add('popup_opened');
            document.addEventListener('keydown', this._handleEscClose);
            formElementQuestion.addEventListener('submit', deleteCard)
        }
        popupQuestion.open();
        popupQuestion.close = function(){
            this._popup.classList.remove('popup_opened');
            document.removeEventListener('keydown', this._handleEscClose);
            formElementQuestion.removeEventListener('submit', deleteCard);
        };
        
    }
    );
    const cardElement = card.createCard();
    return cardElement;
}
const cardCreate = new Section({ 
    renderer: (el)=>{
        cardCreate.addItem(createCard(el));
    }}, section);

popupQuestion.setEventListeners();

const popupAddEdit = new PopupWithForm(popupAddId, (data) => {
    renderLoading(true, formElementAdd);
    api.addCard(data)
    .then(cards =>{
        cards.myId = userId;
        cardCreate.addItem(createCard(cards));
        popupAddEdit.close();
    }  
    )
    .catch((error => console.error(`Ошибка создания карточки ${error}`)))
    .finally(()=>{
        renderLoading(false, formElementAdd);
    });
})

popupAddEdit.setEventListeners();

buttonOpenAddPopup.addEventListener('click', () => {
    validationCheckAdd.resetValidation();
    popupAddEdit.open();
});
formElementAdd.addEventListener('submit', popupAddEdit);
buttonOpenEditProfile.addEventListener('click', initPopupEditSubmit);
formElement.addEventListener('submit', popupProfEdit);
clickOpenAvatarPopup.addEventListener('click', initPopupAvatarSubmit);
formElementAvatar.addEventListener('submit', popupAvatar);

function renderLoading(isLoading, button){
    const defaultText = button.querySelector('.popup__save').textContent;
    const outputText = defaultText.replace('...', '');
    if(isLoading){
        return button.querySelector('.popup__save').textContent = `${outputText}...`;
    } else {
        button.querySelector('.popup__save').textContent = outputText;
    }
  }
