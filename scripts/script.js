const popupProfile = document.querySelector('#profile');
const popupAdd = document.querySelector('#add');
const popupPhoto = document.querySelector('#photo');
const buttonOpenEditProfile = document.querySelector('.profile__edit');
const buttonOpenAddPopup = document.querySelector('.profile__add');
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#elements-template').content;

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
   });
   cardElement.querySelector('.elements__trash').addEventListener('click', () => { 
        cardElement.remove(); 
    });
    initLike(cardElement);
    return cardElement;
}

initialCards.forEach ((el) => {
    cardsContainer.prepend(createCard(el.name,el.link));
})

function initLike(cardElement){
    cardElement.querySelector('.elements__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like_active');
    });
}

function initPopupCloseButton(popup){
    const close = popup.querySelector('.popup__close');
    close.addEventListener('click', function(event) {
        closePopup(popup);
    });
}
function openPopup(popup){
    popup.classList.add('popup_opened');
}

function closePopup(popup){
        popup.classList.remove('popup_opened');
}

function initPopupEditSubmit() {
    buttonOpenEditProfile.addEventListener('click', () => openPopup(popupProfile));
    const nameInput = document.querySelector('.popup__input_type_name');
    const jobInput = document.querySelector('.popup__input_type_description');
    const profTitle = document.querySelector('.profile__title');
    const profSubtitle = document.querySelector('.profile__subtitle');
    const formElement = document.querySelector('.popup__form');
    nameInput.value = profTitle.textContent;
    jobInput.value = profSubtitle.textContent;
    console.log(nameInput.value, jobInput.value);
    function handleFormSubmit (evt) {
        evt.preventDefault();
        profTitle.textContent = nameInput.value;
        profSubtitle.textContent = jobInput.value;
        closePopup(popupProfile);
    }
    formElement.addEventListener('submit', handleFormSubmit);
}

function saveAdd() {
    buttonOpenAddPopup.addEventListener('click', () => openPopup(popupAdd));
    const formElement = popupAdd.querySelector('.popup__form');
    const inputCardImageSrc = document.querySelector('.popup__input_type_image');
    const inputCardTitle = document.querySelector('.popup__input_type_title');
    function handleFormSubmit (evt) {
        evt.preventDefault();
        cardsContainer.prepend(createCard(inputCardTitle.value,inputCardImageSrc.value));
        closePopup(popupAdd);
        formElement.reset();
    }
    formElement.addEventListener('submit', handleFormSubmit);
}

initPopupEditSubmit();
saveAdd();
initPopupCloseButton(popupAdd);
initPopupCloseButton(popupProfile);
initPopupCloseButton(popupPhoto);