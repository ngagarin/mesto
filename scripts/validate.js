//переменные
const validationElements = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible',
};

//хелперы
const showInputError = (formElement, inputElement, errorMessage, validationElements) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationElements.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationElements.errorClass);
};

const hideInputError = (formElement, inputElement, validationElements) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationElements.inputErrorClass);
  errorElement.classList.remove(validationElements.errorClass);
  errorElement.textContent = '';
};

//проверяем валидность и отображаем хелпер
const checkInputValidity = (formElement, inputElement, validationElements) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationElements);
  } else {
    hideInputError(formElement, inputElement, validationElements);
  };
};

//проверка наличия хотя бы одного невалидного поля
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid
  });
};

//включение и отключение submit
function toggleButtonState(inputList, buttonElement, validationElements) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationElements.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationElements.inactiveButtonClass);
    buttonElement.disabled = false;
  };
};

//слушатели
const setEventListeners = (formElement, validationElements) => {
  const inputList = Array.from(formElement.querySelectorAll(validationElements.inputSelector));
  const buttonElement = formElement.querySelector(validationElements.submitButtonSelector);

  // Неактивная кнопка при открытии popup
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationElements);
      toggleButtonState(inputList, buttonElement, validationElements);
    });
  });

  toggleButtonState(inputList, buttonElement, validationElements);
};

// функции-обработчики
const enableValidation = (validationElements) => {
  const formList = Array.from(document.querySelectorAll(validationElements.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      evt.target.reset();
      setEventListeners(formElement, validationElements);
    });
    setEventListeners(formElement, validationElements);
  });
};

enableValidation(validationElements);
