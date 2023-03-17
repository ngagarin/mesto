/** ---------- ИМПОРТ СКРИПТОВ ----------**/

import './index.css';
import {
  token,
  cohort
} from '../utils/authorizationData.js'
import {
  popupEditAvatarButton,
  popupEditProfileButtonOpen,
  popupEditProfile,
  popupEditAvatar,
  editAvatar,
  editProfile,
  profileAvatar,
  profileName,
  profileAbout,
  popupCardsButtonOpen,
  popupAddCard,
  cardAdd,
  cardTemplate,
  containerSelector,
  validationElements
} from '../utils/constants.js';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import UserInfo from '../components/UserInfo.js';


/** ---------- API ----------**/

// Подключить API
const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/${cohort}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});

// Получить данные c сервера или вывести сообщение об ошибке
api.getDataFromServer().then((info) => {
  const [initialCards, userData] = info;
  user.setUserInfo({ name: userData.name, about: userData.about, avatar: userData.avatar, id: userData._id });
  cardsList.renderItems(initialCards);
}).catch((err) => {
  console.log(err);
});


/** ---------- Валидация форм ----------**/

//Активируем валидацию формы изменения аватара
const avatarFormValidation = new FormValidator(validationElements, popupEditAvatar);
avatarFormValidation.enableValidation();

//Активируем валидацию формы изменений профайла
const profileFormValidator = new FormValidator(validationElements, popupEditProfile);
profileFormValidator.enableValidation();

//Активируем валидацию формы добавления карточки
const addCardFormValidator = new FormValidator(validationElements, popupAddCard);
addCardFormValidator.enableValidation();


/** ---------- Профиль ----------**/

// Попап изменения профайла
const user = new UserInfo({ profileName, profileAbout, profileAvatar });

// Открываем popup - редактор аватара
popupEditAvatarButton.addEventListener('click', () => {
  avatarFormValidation.resetValidation();
  popupChangeAvatar.open();
});

// Сменить аватар профиля
const popupChangeAvatar = new PopupWithForm(editAvatar, (formData) => {
  popupChangeAvatar.renderLoading(true);
  api.updateProfileAvatar({ avatar: formData.avatar }).then((data) => {
    user.setUserAvatar({ newUserAvatar: data.avatar });
    popupChangeAvatar.close();
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    popupChangeAvatar.renderLoading(false);
  });
});

//Открываем popup - редактор профайла с заранее известными "имя" и "профессия"
popupEditProfileButtonOpen.addEventListener('click', () => {
  const userData = user.getUserInfo();
  userProfilePopup.setInputValues(userData);
  profileFormValidator.resetValidation();
  userProfilePopup.open();
});

//Сохраняем новые данные профайла
const userProfilePopup = new PopupWithForm(editProfile, function submitForm(formData) {
  userProfilePopup.renderLoading(true);
  api.updateUserInfo(formData).then((data) => {
    user.setUserInfo(data);
    userProfilePopup.close();
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    userProfilePopup.renderLoading(false);
  });
});


/** ---------- Карточки ----------**/

//Достаем первые карточки
const cardsList = new Section(
  containerSelector,
  {
    renderer: (cardData) => {
      const newCard = new Card({
        cardData: cardData,
        cardTemplate: cardTemplate,
        userId: user.getUserId(),
        handleCardClick: (name, link) => {
          openFullScreen.open(name, link);
        },
        handleLikeButton: () => {
          if (newCard.isLiked) {
            api.deleteCardLike(newCard.getCardId()).then((cardData) => {
              newCard.unsetLike();
              newCard.updatelikesCounter(cardData.likes);
            }).catch((err) => {
              console.log(err);
            });
          } else {
            api.addCardLike(newCard.getCardId()).then((cardData) => {
              newCard.setLike();
              newCard.updatelikesCounter(cardData.likes);
            }).catch((err) => {
              console.log(err);
            });
          }
        },
        handleRemoveButton: (event) => {
          const cardElement = event.target.closest('.card');
          const cardId = newCard.getCardId();
          popupDeleteCard.open();
          popupDeleteCard.updateSubmitHandler(() => {
            api.removeCard(cardId).then(() => {
              cardElement.remove();
              popupDeleteCard.close();
            }).catch((err) => {
              console.error(err);
            });
          });
        }
      });
      return newCard.generateCard();
    }
  });

// Создание новой карточки
const addCardPopup = new PopupWithForm(cardAdd, (formData) => {
  addCardPopup.renderLoading(true);
  api.addNewCard({ name: formData.title, link: formData.picture }).then((formData) => {
    cardsList.addItem(formData);
    addCardPopup.close();
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    addCardPopup.renderLoading(false);
  });
});

// Открываем popup - добавления новой карточки
popupCardsButtonOpen.addEventListener('click', () => {
  addCardFormValidator.toggleButtonState();
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});

// Просмотр картинки в попапе
const openFullScreen = new PopupWithImage('.popup_type_image');

// Подтвердить удаление карточки
const popupDeleteCard = new PopupDeleteCard('.popup_type_delete-card');
