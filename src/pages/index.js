import './index.css'; 
import Card from '../components/Card.js';
import FormValidation from '../components/FormValidator.js';
import PopupWithImage from '../components/PicturePopup.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
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
    initialCards
} from '../utils/constants.js';

const userInfo = new UserInfo(userInformation);


const validationCheckAdd = new FormValidation(variables, formElementAdd);
const validationCheckEdit = new FormValidation(variables, formElementEdit);

validationCheckAdd.enableValidation();
validationCheckEdit.enableValidation();

function initPopupEditSubmit() {
    popupProfEdit.setInputInfo(userInfo.getUserInfo());
    popupProfEdit.open();
    validationCheckEdit.resetValidation();
}
const popupProfEdit = new PopupWithForm(popupProfileId, (form) => {
    userInfo.setUserInfo(form);
    popupProfEdit.close();
})

popupProfEdit.setEventListeners();

const popupImageOpen = new PopupWithImage(popupImage);
popupImageOpen.setEventListeners();

function createCard(el) {
    const card = new Card(el, cardTemplate, popupImageOpen.open);
    const cardElement = card.createCard();
    return cardElement;
}

const cardCreate = new Section({ 
    renderer: (el)=>{
        cardCreate.addItem(createCard(el));
    }}, section);

cardCreate.addCard(initialCards);


const popupAddEdit = new PopupWithForm(popupAddId, (data) => {
    cardCreate.addItem(createCard(data));
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