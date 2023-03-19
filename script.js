let edit = document.querySelector('.profile__edit');
edit.addEventListener('click', function(event) {
    let popup = document.querySelector('.popup');
    popup.classList.add("popup_opened");
    let nameInput = document.querySelector('.popup__name');
    let prof_title = document.querySelector('.profile__title');
    nameInput.setAttribute("value", prof_title.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim());
    let jobInput = document.querySelector('.popup__description');
    let prof_subtitle = document.querySelector('.profile__subtitle');
    jobInput.setAttribute("value", prof_subtitle.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim());

    let formElement = document.querySelector('.popup__container');
    function handleFormSubmit (evt) {
        evt.preventDefault();
        prof_title.textContent = nameInput.value;
        prof_subtitle.textContent = jobInput.value;
    }
    formElement.addEventListener('submit', handleFormSubmit);

    let close = document.querySelector('.popup__close');
    let save = document.querySelector('.popup__save');
    
    close.addEventListener('click', function(event) {
        popup.classList.remove("popup_opened");
    });
    save.addEventListener('click', function(event) {
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
