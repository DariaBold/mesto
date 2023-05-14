class FormValidator{
    constructor(variables, form){
        this._inputSelector = variables.inputSelector;
        this._submitButtonSelector = variables.submitButtonSelector;
        this._inactiveButtonClass = variables.inactiveButtonClass;
        this._inputErrorClass = variables.inputErrorClass;
        this._errorClass = variables.errorClass;
        this._form = form;
    }
    _setEventListeners() {
        this._inputList.forEach(input => {
            input.addEventListener('input', () =>{
            this._toggleButtonState(input);
            this._checkInputValidity(input);
          });
        });
    };
    _hasInvalidInput() {
        return Array.from(this._inputList).every(input => input.validity.valid);
    }
    _toggleButtonState(input) {
        if(!this._hasInvalidInput(input)) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    }
    _showInputError(input) {
        this._errorElement = this._form.querySelector(`.${input.id}-error`);
        input.classList.add(this._inputErrorClass);
        this._errorElement.textContent = input.validationMessage;
        this._errorElement.classList.add(this._errorClass);
    };
      
    _hideInputError(input) {
        this._errorElement = this._form.querySelector(`.${input.id}-error`);
        input.classList.remove(this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass);
        this._errorElement.textContent = '';
    };
    _checkInputValidity(input){
        if(!input.validity.valid) {
            this._showInputError(input);
        } else {
            this._hideInputError(input);
        }
    };
    
    enableValidation(){
        this._buttonElement = this._form.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._setEventListeners();
    };
}
export default FormValidator;