import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._picture = document.querySelector('.popup__image');
    this._pictureCaption = document.querySelector('.popup__image-caption');
  }

  open(data) {
    this._picture.src = data.link;
    this._picture.alt = `Фотография. ${data.name}`;
    this._pictureCaption.textContent = data.name;
    super.open();
  }
}
