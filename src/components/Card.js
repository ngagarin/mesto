
export default class Card {
  constructor({ cardData, cardTemplate, userId, handleCardClick, handleLikeButton, handleRemoveButton }) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._alt = cardData.name;
    this._likes = cardData.likes;
    this._cardId = cardData._id;

    this._cardTemplate = cardTemplate;

    this._UserId = userId,
      this._isUserCard = userId === cardData.owner._id;

    this._handleCardClick = handleCardClick;
    this._handleLikeButton = handleLikeButton;
    this._handleRemoveButton = handleRemoveButton;
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  };

  generateCard() {
    this._cardElement = this._getTemplate();

    this._cardTitleElement = this._cardElement.querySelector('.card__title');
    this._cardTitleElement.textContent = this._name;

    this._cardImageElement = this._cardElement.querySelector('.card__picture');
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = `Фотография. ${this._name}`;

    this._cardDelButton = this._cardElement.querySelector('.card__delete');

    this._likeButtonElement = this._cardElement.querySelector('.card__like-button');
    this._likesCounter = this._cardElement.querySelector('.card__likes-counter');
    this._likesCounter.textContent = this._likes.length;

    this._setEventListeners();
    this._toggleLikesCounter();

    return this._cardElement;
  };

  _setEventListeners() {
    this._cardImageElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeButtonElement.addEventListener('click', () => {
      this._handleLikeButton();
    });

    if (!this._isUserCard) {
      this._cardDelButton.remove();
      this._cardDelButton = null;
    } else {
      this._cardElement.querySelector('.card__delete').addEventListener('click', (event) => {
        this._handleRemoveButton(event);
      });
    }
  }

  _toggleLikesCounter() {
    if (this._checkUserLikes()) {
      this.setLike();
    } else {
      this.unsetLike();
    };
  }

  _checkUserLikes() {
    return this._likes.some(item => item._id === this._UserId);
  }

  setLike() {
    this._likeButtonElement.classList.add('card__like-button_active');
    this.isLiked = true;
  }

  unsetLike() {
    this._likeButtonElement.classList.remove('card__like-button_active');
    this.isLiked = false;
  }

  updatelikesCounter(data) {
    this._likesCounter.textContent = data.length;
  }

  getCardId() {
    return this._cardId;
  }
}
