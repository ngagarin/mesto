/* ПЕРЕМЕННЫЕ */

// Тело сайта
const bodyPage = document.querySelector('.page'); //для запрета скролла при открытом popup

// Кнопки открытия popup и сам popup
const popupEditProfileButtonOpen = document.querySelector('.profile__button_type_edit'); //кнопка редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile'); //popup редактирования профайла

const popupCardsButtonOpen = document.querySelector('.profile__button_type_add'); //кнопка добавления карточки "+"
const popupAddCard = document.querySelector('.popup_type_add-card'); //popup добавления карточки

const imagePopup = document.querySelector('.popup_type_image'); //popup просмотра фото

// Кнопки закрытия popup
const profileButtonClose = document.querySelector('.popup__close-button_type_profile'); //закрыть popup профайла
const cardsButtonClose = document.querySelector('.popup__close-button_type_cards'); //закрыть popup профайла
const imageButtonClose = document.querySelector('.popup__close-button_type_image'); //закрыть popup профайла

// Для изменения профиля
const newProfileForm = popupEditProfile.querySelector('.form_type_profile'); //форма редактирования профайла
const nameInput = document.querySelector('.form__input_type_name'); //поле ввода нового имени
const jobInput = document.querySelector('.form__input_type_job'); //поле ввода новой профессии
const profileName = document.querySelector('.profile__name'); //имя по умолчанию
const profileJob = document.querySelector('.profile__job'); //профессия по умолчанию

// Отображение всех карточек в body
const cardsContainer = document.querySelector('.cards__element'); //блок всех карточек
const cardTemplate = document.querySelector('#card').content; //блок одной карточки
const nameOfCards = document.querySelectorAll('.card__city-name'); //имя карточки
const photoOfCards = document.querySelectorAll('.card__picture'); //фотография карточки

// Добавляем карточку
const newCardForm = popupAddCard.querySelector('.form'); //форма добавления карточек
const cityNameInput = document.querySelector('.form__input_type_city-name'); //поле ввода названия города
const pictureLinkInput = document.querySelector('.form__input_type_picture'); //поле ввода ссылки

// Отображение одной карточки в popup
const imagePopupFigure = imagePopup.querySelector('.popup__image'); //popup фотография
const imagePopupCaption = imagePopup.querySelector('.popup__image-caption'); //popup название города

/* ФУНКЦИИ */

// Открываем любой popup
function openPopup(popup) {
  bodyPage.classList.add('page_type_hidden');
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleClosePopup);
};

// Закрываем любой popup
function closePopup(popup) {
  bodyPage.classList.remove('page_type_hidden');
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleClosePopup);
};

// Закрываем любой popup клавишей Escape
function handleClosePopup(event) {
  if (event.code === "Escape") {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

// Закрываем любой popup кликом по оверлэй
function hideOverlay() {
  const allPopups = Array.from(document.querySelectorAll('.popup'));
  allPopups.forEach((popup) => {
    popup.addEventListener('mousedown', function (evt) {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
      };
    });
  });
};

hideOverlay();

// Создаём карточку
function createNewCard(cardData) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const nameNewCard = newCard.querySelector('.card__city-name');
  const imageNewCard = newCard.querySelector('.card__picture');
  const likeNewCard = newCard.querySelector('.card__delete');
  const deleteNewCard = newCard.querySelector('.card__like-button');

  nameNewCard.textContent = cardData.name;
  imageNewCard.src = cardData.link;
  imageNewCard.alt = `Фотография. ${cardData.name}`;

  likeNewCard.addEventListener('click', handleDeleteCard);
  deleteNewCard.addEventListener('click', handleLikeCard);
  imageNewCard.addEventListener('click', function () {
    imagePopupFigure.src = imageNewCard.src;
    imagePopupFigure.alt = imageNewCard.alt;
    imagePopupCaption.textContent = nameNewCard.textContent;
    openPopup(imagePopup);
  });

  return newCard;
};

//Выводим карточку
function renderCards(container, ...cards) {
  cards.forEach(cardData => {
    container.prepend(createNewCard(cardData));
  });
};

//Отображаем первоначальные карточки
renderCards(cardsContainer, ...initialCards);

// Лайкаем карточку
function handleLikeCard(event) {
  event.target.classList.toggle('card__like-button_active');
};

// Удаляем карточку
function handleDeleteCard(event) {
  event.target.closest('.card').remove();
};

/* ФОРМЫ */

// Форма меняем имя и профессию
function handleCreateNewProfile(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

// Форма добавляем новую карточку
function handleSaveNewCard(event) {
  event.preventDefault();

  const card = {
    name: cityNameInput.value,
    link: pictureLinkInput.value
  };

  renderCards(cardsContainer, card);
  closePopup(popupAddCard);
  newCardForm.reset();
};

/* СЛУШАТЕЛИ И ОБРАБОТЧИКИ */

// Открываем popup - редактор профайла с заранее известными "имя" и "профессия"
popupEditProfileButtonOpen.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
});

// Открываем popup с добавлением карточки
popupCardsButtonOpen.addEventListener('click', function () {
  openPopup(popupAddCard);
});

// Закрываем popup кликом по кнопке "X"
profileButtonClose.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

cardsButtonClose.addEventListener('click', function () {
  closePopup(popupAddCard);
});

imageButtonClose.addEventListener('click', function () {
  closePopup(imagePopup);
});

// Сохраняем изменения профайла
newProfileForm.addEventListener('submit', handleCreateNewProfile);

// Сохраняем добавленную карточку
newCardForm.addEventListener('submit', handleSaveNewCard);
