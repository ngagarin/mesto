/* ИМПОРТ СКРИПТОВ */
import './index.css';
import {
  popupEditProfileButtonOpen,
  popupEditProfile,
  editProfile,
  profileName,
  profileJob,
  nameInput,
  jobInput,
  popupCardsButtonOpen,
  popupAddCard,
  cardAdd,
  cardTemplate,
  containerSelector,
  cityNameInput,
  pictureLinkInput,
  validationElements
} from '../utils/constants.js';
import { initialCards } from '../utils/initialCards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

//Попап full screen
const openFullScreen = new PopupWithImage('.popup_type_image');

//Функция создания карточки через класс Card
function createCard(cardData) {
  const newCard = new Card(cardData, cardTemplate, () => { openFullScreen.open(cardData) });
  const cardElement = newCard.generateCard();
  renderCards.addItem(cardElement);
};

//Достаем первые карточки
const renderCards = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      createCard(cardData);
    }
  }, containerSelector
);

renderCards.renderItems();

//Добавляем новую карточку
const addCardPopup = new PopupWithForm(cardAdd, (formData) => {
  createCard({
    name: formData.title,
    link: formData.picture
  });
});

//Попап добавления карточки
popupCardsButtonOpen.addEventListener('click', () => {
  addCardFormValidator.toggleButtonState();
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});

// Попап изменения профайла
const user = new UserInfo({ profileName, profileJob });

//Сохраняем новые данные профайла
const userProfilePopup = new PopupWithForm(editProfile, function submitForm(formData) {
  user.setUserInfo({
    name: formData.name,
    job: formData.job
  })
});

//Открываем popup - редактор профайла с заранее известными "имя" и "профессия"
popupEditProfileButtonOpen.addEventListener('click', () => {
  const userData = user.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  profileFormValidator.resetValidation();
  userProfilePopup.open();
});

//Активируем валидацию формы изменений профайла
const profileFormValidator = new FormValidator(validationElements, popupEditProfile);
profileFormValidator.enableValidation();

//Активируем валидацию формы добавления карточки
const addCardFormValidator = new FormValidator(validationElements, popupAddCard);
addCardFormValidator.enableValidation();
