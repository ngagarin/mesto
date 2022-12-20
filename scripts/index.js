/*для открытия popup*/
const popupButtonOpen = document.querySelector('.profile__button_type_edit');
const popupButtonClose = document.querySelector('.popup__close-button');
const popupShow = document.querySelector('.popup');

/*для изменения профиля*/
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

/*открытие popup*/
function openPopup () {
  /* запретить прокрутку body при открытом popup
  document.body.style.overflow = 'hidden';*/
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupShow.classList.add('popup_opened')
};

/*закрытие popup*/
function closePopup () {
  /* разрешить прокрутку body при закрытом popup
  document.body.style.overflow = 'visible';*/
  popupShow.classList.remove('popup_opened')
};

/*меняем имя и профессию*/
function saveNewProfile(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup()
};

/*слушатели событий для кнопок*/
popupButtonOpen.addEventListener('click', openPopup);
popupButtonClose.addEventListener('click', closePopup);
popupForm.addEventListener('submit', saveNewProfile);


/* попытка активировать лайк не работает на смртфоне */

const like = document.querySelectorAll('.elements__like-button');

like.forEach(function (item) {
  function liked() {
    item.classList.toggle('elements__like-button_active')
  }
  item.addEventListener('click', liked);
})

/*  или с циклом for *

const like = document.querySelectorAll('.elements__like-button');

let searchLikeButton;
for (searchLikeButton = 0; searchLikeButton < like.length; ++searchLikeButton) {
  let likes = like[searchLikeButton]
  function liked() {
    likes.classList.toggle('elements__like-button_active')
  }
  likes.addEventListener('click', liked);
}
*/
