export const popupProfile = document.querySelector('#profile');
export const formElementEdit = popupProfile.querySelector('.popup__form');
export const popupAdd = document.querySelector('#add');
export const buttonOpenEditProfile = document.querySelector('.profile__edit');
export const buttonOpenAddPopup = document.querySelector('.profile__add');
export const formElement = document.querySelector('.popup__form');
export const formElementAdd = popupAdd.querySelector('.popup__form');

export const cardTemplate = '#elements-template';

export const popupProfileId = '#profile';
export const popupAddId = '#add';
export const popupImage = '#photo';
export const section = '.elements';

export const userInformation = {
    profTitle: '.profile__title',
    profSubtitle: '.profile__subtitle'
};

export const variables = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_disable'
};
export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];