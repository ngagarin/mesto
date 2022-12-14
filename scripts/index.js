/*для открытия popup*/
const openPopupButton = document.querySelector('.profile__button_type_edit');
const closePopupButton = document.querySelector('.popup__close-button');
const showPopup = document.querySelector('.popup');

/*для изменения профиля*/
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

/*открытие popup*/
function openPopup() {
  document.body.style.overflow = 'hidden';
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  showPopup.classList.add('popup_opened')
};

openPopupButton.addEventListener('click', openPopup);

/*закрытие popup*/
function closePopup() {
  document.body.style.overflow = 'visible';
  showPopup.classList.remove('popup_opened')
};

closePopupButton.addEventListener('click', closePopup);

/*меняем имя и профессию*/
function saveNewProfile(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup()
};

popupForm.addEventListener('submit', saveNewProfile);

/*попытка активировать лайк не работает на смртфоне*/
const like = document.querySelectorAll('.elements__like-button');

let searchLikeButton;
for (searchLikeButton = 0; searchLikeButton < like.length; ++searchLikeButton) {
  let likes = like[searchLikeButton]
  function liked() {
    likes.classList.toggle('elements__like-button_active')
  }
  likes.addEventListener('click', liked);
}
