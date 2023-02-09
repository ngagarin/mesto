export class Card {
  constructor(cardData, cardSelector, handleFullScreen) {
    this._cardSelector = cardSelector;
    this._handleFullScreen = handleFullScreen;
    this._name = cardData.name;
    this._link = cardData.link;
    this._alt = cardData.name;
    this._element = this._getTemplate();
    this._buttonForLike = this._element.querySelector('.card__like-button');
    this._buttonForDelete = this._element.querySelector('.card__delete');
    this._image = this._element.querySelector('.card__picture');
  };

  // Создаем карточку
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  };

  // Лайкаем карточку
  _handleLikeCard() {
    this._buttonForLike.classList.toggle('card__like-button_active');
  };

  // Удаляем карточку
  _handleDeleteCard() {
    this._element.remove();
  };

  // Слушатель событий
  _setEventListeners() {
    this._buttonForLike.addEventListener('click', () => this._handleLikeCard());
    this._buttonForDelete.addEventListener('click', () => this._handleDeleteCard());
    this._image.addEventListener('click', () => this._handleFullScreen(this._name, this._link));
  };

  // Отображаем карту
  generateCard() {
    this._setEventListeners();
    this._element.querySelector('.card__city-name').textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

    return this._element;
  };
}