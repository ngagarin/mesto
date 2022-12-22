/* ПЕРЕМЕННЫЕ */

// Кнопки открытия popup и сам popup
const popupEditProfileButtonOpen = document.querySelector('.profile__button_type_edit'); //кнопка редактирования профиля
const popupEditProfile = document.querySelector('.popup__type_edit-profile'); //popup редактирования профайла

const popupCardsButtonOpen = document.querySelector('.profile__button_type_add'); //кнопка добавления карточки "+"
const popupAddCard = document.querySelector('.popup__type_add-card'); //popup добавления карточки

const imagePopup = document.querySelector('.popup_type_image'); //popup просмотра фото

// Кнопка закрытия popup
const popupButtonClose = document.querySelectorAll('.popup__close-button'); //закрыть popup

// Для изменения профиля
const newProfileForm = popupEditProfile.querySelector('.popup__form'); //форма редактирования профайла
const nameInput = document.querySelector('.popup__input_type_name'); //поле ввода нового имени
const jobInput = document.querySelector('.popup__input_type_job'); //поле ввода новой профессии
const profileName = document.querySelector('.profile__name'); //имя по умолчанию
const profileJob = document.querySelector('.profile__job'); //профессия по умолчанию

// Отображение всех карточек в body
const cardsContainer = document.querySelector('.cards__element'); //блок всех карточек
const cardTemplate = document.querySelector('#cards__item').content; //блок одной карточки
const nameOfCards = document.querySelectorAll('.cards__city-name'); //имя карточки
const photoOfCards = document.querySelectorAll('.cards__picture'); //фотография карточки

// Добавляем карточку
const newCardForm = popupAddCard.querySelector('.popup__form'); //форма добавления карточек
const cityNameInput = document.querySelector('.popup__input_type_city-name'); //поле ввода названия города
const pictureLinkInput = document.querySelector('.popup__input_type_picture'); //поле ввода ссылки

// Отображение одной карточки в popup
const imagePopupFigure = imagePopup.querySelector('.popup__image'); //popup фотография
const imagePopupCaption = imagePopup.querySelector('.popup__image-caption'); //popup название города

// Первые карточки сайта
const initialCards = [
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1645016978367-5a81d12f915d'
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1556610961-2fecc5927173'
  },
  {
    name: 'Нижний Новгород',
    link: 'https://images.unsplash.com/photo-1638008430645-316b2fa57753'
  },
  {
    name: 'Москва',
    link: 'https://images.unsplash.com/photo-1537891115166-4affb371bbd1'
  },
  {
    name: 'Сочи',
    link: 'https://images.unsplash.com/photo-1608315913658-a61a97944794'
  },
  {
    name: 'Краснодар',
    link: 'https://mtdata.ru/u12/photoAAB4/20353636182-0/original.jpg'
  }
];

/* ФУНКЦИИ */

// Открываем любой popup
function openPopup(popup) {
  document.body.style.overflow = 'hidden'; // запретить прокрутку body при открытом popup
  popup.classList.add('popup_opened');
};

// Закрываем любой popup
function closePopup(event) {
  document.body.style.overflow = 'visible'; // разрешить прокрутку body при закрытом popup
  event.target.closest('.popup').classList.remove('popup_opened');
}

// Меняем имя и профессию
function saveNewProfile(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(event);
};

// Выводим первые карточки
function renderCard() {
  initialCards.reverse().forEach(newItem);
}
renderCard();

// Добавляем новую карточку
function saveNewCard(event) {
  event.preventDefault();
  newItem({ name: cityNameInput.value, link: pictureLinkInput.value, alt: cityNameInput.value });
  closePopup(event);
}

function newItem(card) {
  const newCard = cardTemplate.querySelector('.cards__item').cloneNode(true);
  newCard.querySelector('.cards__city-name').textContent = card.name;
  newCard.querySelector('.cards__picture').src = card.link;
  newCard.querySelector('.cards__picture').alt = card.name;

  newCard.querySelector('.cards__delete').addEventListener('click', deleteCard);
  newCard.querySelector('.cards__like-button').addEventListener('click', likedCard);
  newCard.querySelector('.cards__picture').addEventListener('click', showImagePopup);

  cardsContainer.prepend(newCard);
}

// Лайкаем карточку
function likedCard(event) {
  event.target.closest('.cards__like-button').classList.toggle('cards__like-button_active');
}

// Удаляем карточку
function deleteCard(event) {
  event.target.closest('.cards__item').remove();
}

// Открытие popup на весь экран
function showImagePopup(event) {
  imagePopupFigure.src = event.target.src;
  imagePopupFigure.alt = event.target.alt;
  imagePopupCaption.textContent = event.target.closest('.cards__item').querySelector('.cards__city-name').textContent;
  openPopup(imagePopup);
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

// Закрываем popup
popupButtonClose.forEach(button => button.addEventListener('click', closePopup));

// Сохраняем изменения профайла
newProfileForm.addEventListener('submit', saveNewProfile);

// Сохраняем добавленную карточку
newCardForm.addEventListener('submit', saveNewCard);
