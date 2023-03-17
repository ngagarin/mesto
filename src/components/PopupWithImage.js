import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._picture = document.querySelector('.popup__image');
    this._pictureCaption = document.querySelector('.popup__image-caption');
  }

  open(name, link) {
    this._pictureCaption.textContent = name;
    this._picture.src = link;
    this._picture.alt = `Фотография. ${name}`;
    super.open();
  }
}
