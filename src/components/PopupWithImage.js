import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._picture = this._popup.querySelector('.popup__image');
    this._pictureCaption = this._popup.querySelector('.popup__image-caption');
  }

  open(name, link) {
    this._pictureCaption.textContent = name;
    this._picture.src = link;
    this._picture.alt = `Фотография. ${name}`;
    super.open();
  }
}
