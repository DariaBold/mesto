import initialCards from './constants.js';
import Card from './Card.js';
const popupProfile = document.querySelector('#profile');
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
const buttonElement = popupAdd.querySelector('.popup__save');

const cardTemplate = '#elements-template';

initialCards.forEach ((el) => {
    createNewCard(el);
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
function initPopupEditSubmit() {
    openPopup(popupProfile);
    nameInput.value = profTitle.textContent;
    jobInput.value = profSubtitle.textContent;
}
function handleFormSubmit (evt) {
    evt.preventDefault();
    profTitle.textContent = nameInput.value;
    profSubtitle.textContent = jobInput.value;
    closePopup(popupProfile);
}
function createNewCard(el){
    const card = new Card(el, cardTemplate, openPopup);
    addCard(cardsContainer, card.createCard());
}
function handleFormSubmitAdd (evt) {
    evt.preventDefault();
    const inputCard = {name: inputCardTitle.value, link:inputCardImageSrc.value};
    createNewCard(inputCard);
    closePopup(popupAdd);
    formElementAdd.reset();
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(variables.inactiveButtonClass);
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

buttonOpenAddPopup.addEventListener('click', () => openPopup(popupAdd));
formElementAdd.addEventListener('submit', handleFormSubmitAdd);
buttonOpenEditProfile.addEventListener('click', initPopupEditSubmit);
formElement.addEventListener('submit', handleFormSubmit);
listenerBackground();