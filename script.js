let edit = document.querySelector('.profile__edit');
edit.addEventListener('click', function(event) {
    let popup = document.querySelector('.popup');
    popup.classList.add("popup_opened");
});
let pop_name = document.querySelector('.popup__name');
let prof_title = document.querySelector('.profile__title');
pop_name.setAttribute("value", prof_title.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim());
let pop__description = document.querySelector('.popup__description');
let prof_subtitle = document.querySelector('.profile__subtitle');
pop__description.setAttribute("value", prof_subtitle.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim());
