import './pages/index.css'; 
import initialCards from './components/constants.js';
import Card from './components/Card.js';
import FormValidation from './components/FormValidator.js';
import PopupWithImage from './components/PopupWithImage.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';
import PopupWithForm from './components/PopupWithForm.js';
import {popupProfile,
    formElementEdit,
    popupAdd,
    buttonOpenEditProfile,
    buttonOpenAddPopup,
    inputCardImageSrc,
    inputCardTitle,
    formElement,
    formElementAdd,
    cardTemplate,
    popupProfileId,
    popupAddId,
    popupImage,
    section,
    userInformation,
    variables 
} from './utils/constants.js';

const userInfo = new UserInfo(userInformation);


const validationCheckAdd = new FormValidation(variables, formElementAdd);
const validationCheckEdit = new FormValidation(variables, formElementEdit);

validationCheckAdd.enableValidation();
validationCheckEdit.enableValidation();

function initPopupEditSubmit() {
    userInfo.getUserInfo();
    popupProfEdit.open();
    validationCheckEdit.resetValidation();
}
const popupProfEdit = new PopupWithForm(popupProfileId, (evt) => {
    evt.preventDefault();
    userInfo.setUserInfo();
    popupProfEdit.close();
})

popupProfEdit.setEventListeners();

const popupImageOpen = new PopupWithImage(popupImage);
popupImageOpen.setEventListeners();

const createNewCard = new Section({ 
    items: initialCards, 
    renderer: (el)=>{
        const card = new Card(el, cardTemplate, popupImageOpen.open);
        const cardElement = card.createCard();
        return cardElement;
    }}, section);

createNewCard.addCard();

const popupAddEdit = new PopupWithForm(popupAddId, (evt) => {
    evt.preventDefault();
    const createAddCard = new Section({ 
        items: [popupAddEdit.getInputValues({name: inputCardTitle.value, link:inputCardImageSrc.value})], 
        renderer: (el)=>{
            const card = new Card(el, cardTemplate, popupImageOpen.open);
            const cardElement = card.createCard();
            return cardElement;
        }}, section);
        createAddCard.addCard();
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