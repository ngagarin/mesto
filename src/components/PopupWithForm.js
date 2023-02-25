import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, submitForm) {
    super(selectorPopup);
    this._form = this._popup.querySelector('.form');
    this._submitForm = submitForm;
    this._inputList = Array.from(this._form.querySelectorAll('.form__input'));
    this._inputValues = {};
  }

  _getInputValues() {
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    })
    return this._inputValues;
  }

  open() {
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    })
  }
}
