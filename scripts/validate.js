const enableConst = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_disable'
});

const showInputError = (form, input, errorsMessage, {inputErrorClass,errorClass, ...rest}) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.add(inputErrorClass);
    errorElement.textContent = errorsMessage;
    errorElement.classList.add(errorClass);
};
  
const hideInputError = (form, input, {inputErrorClass, errorClass, ...rest}) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (form, input, ...rest) => {
    if(!input.validity.valid) {
        showInputError(form, input, input.validationMessage, rest);
    } else {
        hideInputError(form, input, rest);
    }
};

const setEventListeners = (form,{submitButtonSelector,inputSelector, ...rest}) => {
    const buttonElement = form.querySelector(submitButtonSelector);
    const inputList = Array.from(form.querySelectorAll(inputSelector));
    inputList.forEach((input) => {
      input.addEventListener('input', function () {
        toggleButtonState(inputList, buttonElement, rest);
        checkInputValidity(form, input);
      });
    });
  };

const enableValidation = function({formSelector, ...rest}){
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((form) => {
        form.addEventListener('submit ', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(form, rest);
    });
};

const toggleButtonState = (inputList, buttonElement,{ inactiveButtonClass, ...rest}) => {
    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}
const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
      return !input.validity.valid;
  }); 
}

enableValidation(enableConst);