import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
  }

  updateSubmitHandler(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}
