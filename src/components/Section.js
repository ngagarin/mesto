export default class Section {
  constructor(containerSelector, { renderer }) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);;
  }

  renderItems(initialCards) {
    initialCards.forEach(card => {
      this.addItems(card);
    });
  }

  // Достаём initialCards (сперва самые новые)
  addItems(item) {
    const card = this._renderer(item);
    this._container.append(card);
  }

  // Добавляем карточку (в самое начало)
  addItem(item) {
    const card = this._renderer(item);
    this._container.prepend(card);
  }
}
