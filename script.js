let popup = document.querySelector('.popup');
let popupadd = document.querySelector('#add');
let photo = document.querySelector('#photo');
let edit = document.querySelector('.profile__edit');
let add = document.querySelector('.profile__add');
let view = document.querySelector('.elements__image');
let cartsContainer = document.querySelector('.elements');
let like = document.querySelectorAll('.elements__like');
const cartTemplate = document.querySelector('#elements-template').content;

const initialCards = [
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
function liked(cartElement){
    cartElement.querySelector('.elements__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like_active');
    });
}
initialCards.forEach ((el) => {
    const cartElement = cartTemplate.querySelector('.elements__cart').cloneNode(true);
    cartElement.querySelector('.elements__image').src = el.link;
    cartElement.querySelector('.elements__title').textContent = el.name;
    cartsContainer.prepend(cartElement);
    liked(cartElement);
})
function open(button, window){
    button.addEventListener('click', function(event) {
    window.classList.add("popup_opened");
});
}

open(edit,popup);
open(add,popupadd);

function close(window){
    let close = window.querySelector('.popup__close');
    close.addEventListener('click', function(event) {
        window.classList.remove("popup_opened");
    });
}

close(popup);
close(popupadd);

function save() {
    let nameInput = document.querySelector('.popup__input_type_name');
    let jobInput = document.querySelector('.popup__input_type_description');
    let profTitle = document.querySelector('.profile__title');
    let profSubtitle = document.querySelector('.profile__subtitle');
    let formElement = document.querySelector('.popup__form');
    nameInput.value = profTitle.textContent;
    jobInput.value = profSubtitle.textContent;
    function handleFormSubmit (evt) {
        evt.preventDefault();
        profTitle.textContent = nameInput.value;
        profSubtitle.textContent = jobInput.value;
        popup.classList.remove("popup_opened");
    }
    formElement.addEventListener('submit', handleFormSubmit);
    
}
save();
let image = document.querySelector('.popup__input_type_image');
let title = document.querySelector('.popup__input_type_title');

function addCart(imageValue, titleValue) {
    const cartElement = cartTemplate.querySelector('.elements__cart').cloneNode(true);
    cartElement.querySelector('.elements__image').src = imageValue;
    cartElement.querySelector('.elements__title').textContent = titleValue;
    cartsContainer.prepend(cartElement);
    liked(cartElement);
    cartElement.querySelector('.elements__trash').addEventListener('click', function () {
        cartElement.remove();
    });
    openPhoto();
}
function saveAdd() {
    let profTitle = cartTemplate.querySelector('.elements__title');
    let profSubtitle = cartTemplate.querySelector('.elements__image');
    let formElement = popupadd.querySelector('.popup__form');
    function handleFormSubmit (evt) {
        evt.preventDefault();
        profTitle.textContent = title.value;
        profSubtitle.src = image.value;
        addCart(image.value, title.value);
        popupadd.classList.remove("popup_opened");
    }
    formElement.addEventListener('submit', handleFormSubmit);
}

function deleteCart() {
    const trash = cartsContainer.querySelectorAll('.elements__trash');
    for(let i = 0 ; i < trash.length; i++ ){
    trash[i].addEventListener('click', function (event){
        trash[i].parentElement.remove();
    });
}
}
deleteCart();
saveAdd();
function openPhoto(){
    const image = document.querySelectorAll('.elements__image');
    const description = document.querySelectorAll('.elements__title');
    for(let i = 0 ; i < image.length; i++ ){
        image[i].addEventListener('click', function(event) {
        photo.querySelector('.popup__image').src = image[i].src;
        photo.querySelector('.popup__description').textContent = description[i].textContent;
        photo.classList.add("popup_opened");
});
}
}
openPhoto();
close(photo);