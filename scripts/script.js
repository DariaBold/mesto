const popupProfile = document.querySelector('#profile');
const popupAdd = document.querySelector('#add');
const popupPhoto = document.querySelector('#photo');
const buttonOpenEditProfile = document.querySelector('.profile__edit');
const buttonOpenAddPopup = document.querySelector('.profile__add');
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#elements-template').content;
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profTitle = document.querySelector('.profile__title');
const profSubtitle = document.querySelector('.profile__subtitle');
const inputCardImageSrc = document.querySelector('.popup__input_type_image');
const inputCardTitle = document.querySelector('.popup__input_type_title');

const createCard = (title, src) => {
    const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);
    cardElement.querySelector('.elements__title').textContent = title;
    const cardImage = cardElement.querySelector('.elements__image');
    cardImage.src = src;
    cardImage.alt = title;
    cardImage.addEventListener('click', () => {
       const popupPhotoImage =  popupPhoto.querySelector('.popup__image');
        popupPhotoImage.src = src;
        popupPhotoImage.alt = title; 
        popupPhoto.querySelector('.popup__description').textContent = title;
        openPopup(popupPhoto);
        popupPhoto.addEventListener('click', clickBackground);
   });
   cardElement.querySelector('.elements__trash').addEventListener('click', () => { 
        cardElement.remove(); 
    });
    return cardElement;
}

initialCards.forEach ((el) => {
    cardsContainer.prepend(createCard(el.name,el.link));
})

cardsContainer.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('elements__like')) {
  evt.target.classList.toggle('elements__like_active'); 
  }
}); 
function initPopupCloseButton(popup){
    const close = popup.querySelector('.popup__close');
    close.addEventListener('click', function(event) {
        closePopup(popup);
    });
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
    buttonOpenEditProfile.addEventListener('click', () => openPopup(popupProfile));
    popupProfile.addEventListener('click', clickBackground);
    const formElement = document.querySelector('.popup__form');

    nameInput.value = profTitle.textContent;
    jobInput.value = profSubtitle.textContent;

    formElement.addEventListener('submit', handleFormSubmit);
}
function handleFormSubmit (evt) {
    evt.preventDefault();
    profTitle.textContent = nameInput.value;
    profSubtitle.textContent = jobInput.value;
    closePopup(popupProfile);
}

function saveAdd() {
    buttonOpenAddPopup.addEventListener('click', () => openPopup(popupAdd));
    popupAdd.addEventListener('click', clickBackground);
    const formElement = popupAdd.querySelector('.popup__form');
    const buttonElement = popupAdd.querySelector('.popup__save');
    function handleFormSubmit (evt) {
        evt.preventDefault();
        cardsContainer.prepend(createCard(inputCardTitle.value,inputCardImageSrc.value));
        closePopup(popupAdd);
        formElement.reset();
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(variables.inactiveButtonClass);
    }
    
    formElement.addEventListener('submit', handleFormSubmit);
}
function keydownEsc(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}
function clickBackground(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    }
}
initPopupEditSubmit();
saveAdd();
initPopupCloseButton(popupAdd);
initPopupCloseButton(popupProfile);
initPopupCloseButton(popupPhoto);