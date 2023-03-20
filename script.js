let edit = document.querySelector('.profile__edit');
edit.addEventListener('click', function(event) {
    let popup = document.querySelector('.popup');
    popup.classList.add("popup_opened");
    let nameInput = document.querySelector('.popup__input_type_name');
    let jobInput = document.querySelector('.popup__input_type_description');
    let profTitle = document.querySelector('.profile__title');
    let profSubtitle = document.querySelector('.profile__subtitle');
    nameInput.value = profTitle.textContent;
    jobInput.value = profSubtitle.textContent;
    let formElement = document.querySelector('.popup__form');
    function handleFormSubmit (evt) {
        evt.preventDefault();
        profTitle.textContent = nameInput.value;
        profSubtitle.textContent = jobInput.value;
        popup.classList.remove("popup_opened");
    }
    formElement.addEventListener('submit', handleFormSubmit);
    let close = document.querySelector('.popup__close');
    close.addEventListener('click', function(event) {
        popup.classList.remove("popup_opened");
    });
});


function like(){
    let like = document.querySelectorAll('.elements__like');
    for(let i = 0 ; i < like.length; i++ ){
    like[i].addEventListener('click', function(event) {
    if (like[i].classList.contains('elements__like_active') === true) {
        like[i].classList.remove('elements__like_active');
    } else {
        like[i].classList.add('elements__like_active');
    }
    });
    }
}
like();
