// Первые карточки сайта
export const initialCards = [
  {
    name: 'Ростов-на-Дону',
    link: './images/card/rostov-on-don.jpeg',
  },
  {
    name: 'Волгоград',
    link: './images/card/volgograd.jpg',
  },
  {
    name: 'Казань',
    link: './images/card/kazan.jpeg',
  },
  {
    name: 'Краснодар',
    link: './images/card/krasnodar.jpeg'
  },
  {
    name: 'Сочи',
    link: './images/card/sochi.jpeg'
  },
  {
    name: 'Москва',
    link: './images/card/moscow.jpeg'
  },
  {
    name: 'Нижний Новгород',
    link: './images/card/nizhniy-novgorod.jpeg'
  },
  {
    name: 'Санкт-Петербург',
    link: './images/card/saint-petersburg.jpeg'
  },
  {
    name: 'Камчатка',
    link: './images/card/kamchatka.jpeg',
  }
];

// Валидация форм
export const validationElements = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible',
};

export const configElements = {
  //тело сайта
  bodyPage: document.querySelector('.page'),
  bodyPageHidden: 'page_type_hidden',
  //все попапы
  allPopups: Array.from(document.querySelectorAll('.popup')),
  popup: '.popup',
  popupOpened: 'popup_opened',
  popupFullScreen: document.querySelector('.popup_type_image'),
  //редактируем профайл
  popupEditProfileButtonOpen: document.querySelector('.profile__button_type_edit'),
  popupEditProfile: document.querySelector('.popup_type_edit-profile'),
  newProfileForm: document.querySelector('.form_type_profile'),
  nameInput: document.querySelector('.form__input_type_name'),
  jobInput: document.querySelector('.form__input_type_job'),
  profileName: document.querySelector('.profile__name'),
  profileJob: document.querySelector('.profile__job'),
  //открытие попап добавления карты
  popupCardsButtonOpen: document.querySelector('.profile__button_type_add'),
  //все кнопки закрытия попап
  allCloseButtons: Array.from(document.querySelectorAll('.popup__close-button')),
};

export const configForCard = {
  //popup добавления карточки
  popupAddCard: document.querySelector('.popup_type_add-card'),
  //форма добавления карточек
  newCardForm: document.querySelector('#editCardsForm'),
  elementsContainer: document.querySelector('.cards__element'),
  picture: document.querySelector('.popup__image'),
  pictureCaption: document.querySelector('.popup__image-caption'),
  cityNameInput: document.querySelector('.form__input_type_city-name'),
  pictureLinkInput: document.querySelector('.form__input_type_picture'),
};
