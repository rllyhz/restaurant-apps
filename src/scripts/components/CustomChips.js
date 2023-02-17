export default class Menu extends HTMLElement {
  static tagName = 'custom-chips';

  set detail({ items, title }) {
    this._items = items;
    this._title = title;
    this._render();
  }

  _render() {
    this.innerHTML = `
      <div class='container'>
        <p class='title'>${this._title}</p>
        <div class='chips-menu'></div>
      </div>
    `;

    this._items.forEach((item) => {
      const itemChip = document.createElement('span');
      itemChip.innerText = item;
      this.querySelector('.container .chips-menu').appendChild(itemChip);
    });
  }
}

customElements.define(Menu.tagName, Menu);
