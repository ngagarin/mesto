/* ИМПОРТ СКРИПТОВ */

import { initialCards, validationElements, configElements, configForCard } from './configElements.js';

import { Card } from './card.js';

import { Validate } from './validate.js';

/* ФУНКЦИИ */

//Функция добавления карточки в контейнер
function addCardToContainer(container, card) {
  container.prepend(card);
};

//Функция создания карточки через класс Card
function createCard(cardData) {
  const card = new Card(cardData, '#card', handleFullScreen);
  const cardElement = card.generateCard();

  return cardElement;
};

//Доcтаем первые карточки
initialCards.forEach((card) => {
  const startCard = createCard(card);
  addCardToContainer(configForCard.elementsContainer, startCard);
});

// Открываем popup с картинкой на весь экран
function handleFullScreen(name, link) {
  configForCard.picture.alt = name;
  configForCard.picture.src = link;
  configForCard.pictureCaption.textContent = configForCard.picture.alt;
  openPopup(configElements.popupFullScreen);
};

// Открываем любой popup
function openPopup(popup) {
  configElements.bodyPage.classList.add(configElements.bodyPageHidden);
  popup.classList.add(configElements.popupOpened);
  document.addEventListener('keydown', handleClosePopup);
};

// Закрываем любой popup
function closePopup(popup) {
  configElements.bodyPage.classList.remove(configElements.bodyPageHidden);
  popup.classList.remove(configElements.popupOpened);
  document.removeEventListener('keydown', handleClosePopup);
};

// Закрываем любой popup клавишей Escape
function handleClosePopup(event) {
  if (event.code === "Escape") {
    const popup = document.querySelector('.popup_opened'); //не получается убрать в configElements
    closePopup(popup);
  }
};

// Закрываем любой popup кликом по кнопке "X"
configElements.allCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const currentPopup = button.closest(configElements.popup);
    closePopup(currentPopup);
  });
});

// Закрываем любой popup кликом по оверлэй
function hideOverlay() {
  configElements.allPopups.forEach((popup) => {
    popup.addEventListener('mousedown', function (evt) {
      if (evt.target.classList.contains(configElements.popupOpened)) {
        closePopup(evt.target);
      };
    });
  });
};

hideOverlay();

/* ФОРМЫ */

// Меняем имя и профессию
function handleCreateNewProfile(event) {
  event.preventDefault();
  configElements.profileName.textContent = configElements.nameInput.value;
  configElements.profileJob.textContent = configElements.jobInput.value;
  closePopup(configElements.popupEditProfile);
};

// Добавляем новую карточку
function handleSaveNewCard(event) {
  event.preventDefault();

  const newCard = createCard({
    name: configForCard.cityNameInput.value,
    link: configForCard.pictureLinkInput.value
  });

  addCardToContainer(configForCard.elementsContainer, newCard);
  closePopup(configForCard.popupAddCard);
  configForCard.newCardForm.reset();
};

/* СЛУШАТЕЛИ И ОБРАБОТЧИКИ */

//Активируем валидацию формы изменений профайла
const profileFormValidator = new Validate(validationElements, configElements.popupEditProfile);
profileFormValidator.enableValidation();

//Активируем валидацию формы добавления карточки
const addCardFormValidator = new Validate(validationElements, configForCard.popupAddCard);
addCardFormValidator.enableValidation();

// Открываем popup - редактор профайла с заранее известными "имя" и "профессия"
configElements.popupEditProfileButtonOpen.addEventListener('click', function () {
  configElements.nameInput.value = configElements.profileName.textContent;
  configElements.jobInput.value = configElements.profileJob.textContent;
  openPopup(configElements.popupEditProfile);
  profileFormValidator.resetValidation();
});

// Открываем popup с добавлением карточки
configElements.popupCardsButtonOpen.addEventListener('click', function () {
  openPopup(configForCard.popupAddCard);
  configForCard.newCardForm.reset();
  addCardFormValidator.resetValidation();
});

// Сохраняем изменения профайла
configElements.newProfileForm.addEventListener('submit', handleCreateNewProfile);

// Сохраняем добавленную карточку
configForCard.newCardForm.addEventListener('submit', handleSaveNewCard);


