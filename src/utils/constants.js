// Для работы с профайлом
export const popupEditProfileButtonOpen = document.querySelector('.profile__button_type_edit');
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const editProfile = '.popup_type_edit-profile';
export const profileName = '.profile__name';
export const profileJob = '.profile__job';
export const nameInput = document.querySelector('.form__input_type_name');
export const jobInput = document.querySelector('.form__input_type_job');

// Для работы с карточками
export const popupCardsButtonOpen = document.querySelector('.profile__button_type_add');
export const popupAddCard = document.querySelector('.popup_type_add-card');
export const cardAdd = '.popup_type_add-card';
export const cardTemplate = '#card';
export const elementsContainer = document.querySelector('.cards__element');
export const cityNameInput = document.querySelector('.form__input_type_city-name');
export const pictureLinkInput = document.querySelector('.form__input_type_picture');

// Валидация форм
export const validationElements = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible',
};
