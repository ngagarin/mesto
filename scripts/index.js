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
const newProfileForm = popupEditProfile.querySelector('.popup__form'); //форма редактирования профайла
const nameInput = document.querySelector('.popup__input_type_name'); //поле ввода нового имени
const jobInput = document.querySelector('.popup__input_type_job'); //поле ввода новой профессии
const profileName = document.querySelector('.profile__name'); //имя по умолчанию
const profileJob = document.querySelector('.profile__job'); //профессия по умолчанию

// Отображение всех карточек в body
const cardsContainer = document.querySelector('.cards__element'); //блок всех карточек
const cardTemplate = document.querySelector('#card').content; //блок одной карточки
const nameOfCards = document.querySelectorAll('.card__city-name'); //имя карточки
const photoOfCards = document.querySelectorAll('.card__picture'); //фотография карточки

// Добавляем карточку
const newCardForm = popupAddCard.querySelector('.popup__form'); //форма добавления карточек
const cityNameInput = document.querySelector('.popup__input_type_city-name'); //поле ввода названия города
const pictureLinkInput = document.querySelector('.popup__input_type_picture'); //поле ввода ссылки

// Отображение одной карточки в popup
const imagePopupFigure = imagePopup.querySelector('.popup__image'); //popup фотография
const imagePopupCaption = imagePopup.querySelector('.popup__image-caption'); //popup название города

/* ФУНКЦИИ */

// Открываем любой popup
function openPopup(popup) {
  bodyPage.classList.add('page_type_hidden');
  popup.classList.add('popup_opened');
};

// Закрываем любой popup
function closePopup(popup) {
  bodyPage.classList.remove('page_type_hidden');
  popup.classList.remove('popup_opened');
}

// Создаём карточку
function createNewCard(name, link) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const nameNewCard = newCard.querySelector('.card__city-name');
  const imageNewCard = newCard.querySelector('.card__picture');
  const likeNewCard = newCard.querySelector('.card__delete');
  const deleteNewCard = newCard.querySelector('.card__like-button');

  nameNewCard.textContent = name;
  imageNewCard.src = link;
  imageNewCard.alt = `Фотография. ${name}`;

  likeNewCard.addEventListener('click', deleteCard);
  deleteNewCard.addEventListener('click', likedCard);
  imageNewCard.addEventListener('click', function () {
    imagePopupFigure.src = imageNewCard.src;
    imagePopupFigure.alt = imageNewCard.alt;
    imagePopupCaption.textContent = nameNewCard.textContent;
    openPopup(imagePopup);
  });

  return newCard;
}

//Выводим карточку
function renderCards(container, ...cards) {
  cards.forEach(card => {
    container.prepend(createNewCard(card.name, card.link));
  });
}

// Лайкаем карточку
function likedCard(event) {
  event.target.classList.toggle('card__like-button_active');
}

// Удаляем карточку
function deleteCard(event) {
  event.target.closest('.card').remove();
}

//Отображаем первоначальные карточки
renderCards(cardsContainer, ...initialCards);

/* ФОРМЫ */

// Форма меняем имя и профессию
function createNewProfile(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

// Форма добавляем новую карточку
function saveNewCard(event) {
  event.preventDefault();

  const card = {
    name: cityNameInput.value,
    link: pictureLinkInput.value
  };

  renderCards(cardsContainer, card);
  closePopup(popupAddCard);
  newCardForm.reset();
}

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

// Закрываем popup редактирования профайла
profileButtonClose.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

// Закрываем popup добавления карты
cardsButtonClose.addEventListener('click', function () {
  closePopup(popupAddCard);
});

// Закрываем popup с фото
imageButtonClose.addEventListener('click', function () {
  closePopup(imagePopup);
});

// Сохраняем изменения профайла
newProfileForm.addEventListener('submit', createNewProfile);

// Сохраняем добавленную карточку
newCardForm.addEventListener('submit', saveNewCard);
