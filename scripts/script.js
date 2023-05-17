import initialCards from './constants.js';
import Card from './Card.js';
import FormValidation from './FormValidator.js';
const popupProfile = document.querySelector('#profile');
const formElementEdit = popupProfile.querySelector('.popup__form');
const popupAdd = document.querySelector('#add');
const buttonOpenEditProfile = document.querySelector('.profile__edit');
const buttonOpenAddPopup = document.querySelector('.profile__add');
const cardsContainer = document.querySelector('.elements');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profTitle = document.querySelector('.profile__title');
const profSubtitle = document.querySelector('.profile__subtitle');
const inputCardImageSrc = document.querySelector('.popup__input_type_image');
const inputCardTitle = document.querySelector('.popup__input_type_title');
const formElement = document.querySelector('.popup__form');
const formElementAdd = popupAdd.querySelector('.popup__form');

const cardTemplate = '#elements-template';

const variables = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_disable'
};

initialCards.forEach ((el) => {
    addCard(cardsContainer, createNewCard(el));
})
function addCard(cardsContainer, card){
    cardsContainer.prepend(card);
}

function openPopup(popup){
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', keydownEsc);
}
function closePopup(popup){
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', keydownEsc);
}

const validationCheckAdd = new FormValidation(variables, formElementAdd);
const validationCheckEdit = new FormValidation(variables, formElementEdit);

validationCheckAdd.enableValidation();
validationCheckEdit.enableValidation();

function initPopupEditSubmit() {
    nameInput.value = profTitle.textContent;
    jobInput.value = profSubtitle.textContent;
    openPopup(popupProfile);
    validationCheckEdit.resetValidation();
}
function handleFormSubmit (evt) {
    evt.preventDefault();
    profTitle.textContent = nameInput.value;
    profSubtitle.textContent = jobInput.value;
    closePopup(popupProfile);
}
function createNewCard(el){
    const card = new Card(el, cardTemplate, openPopup);
    const cardElement = card.createCard();
  return cardElement
}
function handleFormSubmitAdd (evt) {
    evt.preventDefault();
    const inputCard = {name: inputCardTitle.value, link:inputCardImageSrc.value};
    addCard(cardsContainer, createNewCard(inputCard));
    closePopup(popupAdd);
}
function keydownEsc(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}
function clickBackground(evt) {
    if (evt.target === evt.currentTarget) {
        if(evt.currentTarget.classList.contains('popup_opened')) {
            closePopup(evt.currentTarget);
        }
    }
}
function listenerBackground(){
    const popupAll = document.querySelectorAll('.popup');
    popupAll.forEach((popup) => {
        const close = popup.querySelector('.popup__close');
        close.addEventListener('click', () => closePopup(popup));
        popup.addEventListener('click', clickBackground);
    });
}

buttonOpenAddPopup.addEventListener('click', () => {
    formElementAdd.reset();
    validationCheckAdd.resetValidation();
    openPopup(popupAdd);
});
formElementAdd.addEventListener('submit', handleFormSubmitAdd);
buttonOpenEditProfile.addEventListener('click', initPopupEditSubmit);
formElement.addEventListener('submit', handleFormSubmit);
listenerBackground();

