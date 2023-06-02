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
const popupQuestion = new Popup(popupQuestionId);
popupQuestion.setEventListeners();


const popupProfEdit = new PopupWithForm(popupProfileId, (form) => {
    renderLoading(true, formElement);
    api.setUserInfo(form)
        .then(res => {userInfo.setUserInfo({
            name: res.name,
            description: res.about, 
            avatar: res.avatar
        })
        })
        .catch((error => console.error(`Ошибка редактирования профиля ${error}`)))
        .finally(()=>{
            renderLoading(true, formElement);
        })
    popupProfEdit.close();
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
    })
    .catch((error => console.error(`Ошибка редактирования аватара ${error}`)))
    .finally(()=>{
        renderLoading(false, formElementAvatar);
    });
    popupAvatar.close();
})

popupProfEdit.setEventListeners();
popupAvatar.setEventListeners();
const popupImageOpen = new PopupWithImage(popupImage);
popupImageOpen.setEventListeners();

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
        popupQuestion.open();
        formElementQuestion.addEventListener('submit',  (evt) => {
            renderLoading(true, formElementQuestion);
            evt.preventDefault();
            api.deleteCard(cardId)
                .then(() =>{
                    card.deleteCardFromHtml();
                    popupQuestion.close();
                })
                .catch((error => console.error(`Ошибка удаления карточки ${error}`)))
                .finally(()=>{
                    renderLoading(false, formElementQuestion);
                });
        }
        )
    });
    const cardElement = card.createCard();
    return cardElement;
}

const cardCreate = new Section({ 
    renderer: (el)=>{
        cardCreate.addItem(createCard(el));
    }}, section);

const popupAddEdit = new PopupWithForm(popupAddId, (data) => {
    renderLoading(true, formElementAdd);
    Promise.all([api.getUserInfo(), api.addCard(data)])
    .then(([user, cards]) =>{
        cards.myId = user._id;
        cardCreate.addItem(createCard(cards));
    })
    .catch((error => console.error(`Ошибка создания карточки ${error}`)))
    .finally(()=>{
        renderLoading(false, formElementAdd);
    });
    popupAddEdit.close();
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
    if(isLoading){
      button.querySelector('.popup__save').textContent = `${defaultText}...`;
    } else {
        button.textContent = defaultText;
    }
  }

Promise.all([api.getUserInfo(),api.getInitialCards()])
    .then(([user, cards]) =>{
        cards.forEach(element => {
            element.myId = user._id;
        });
        userInfo.setUserInfo({
            name: user.name,
            description: user.about, avatar: user.avatar
        });
        cardCreate.addCard(cards);
    })
    .catch((error => console.error(`Ошибка данных ${error}`)))
