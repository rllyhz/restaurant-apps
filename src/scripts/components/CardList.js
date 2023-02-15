import { createElement } from '../helpers/DomHelper';
import truncateString from '../helpers/DataHelper';
import CardItem from './CardItem';

export default class CardList extends HTMLElement {
  static tagName = 'card-list';

  set adapterData(newAdapter) {
    this._items = newAdapter.listItem;
    this._onItemClickedCallback = newAdapter.onItemClickedCallback;
    this._render();
  }

  _render() {
    this.innerHTML = `
      <div class='container-card'>
        <h3 id='recommendation'>${this.dataset.title}</h3>
        <div class='container-items'></div>
      </div>
    `;

    this._items.forEach((item) => {
      this.querySelector('.container-items').appendChild(
        createElement({
          tagName: CardItem.tagName,
          data: {
            params: {
              id: item.id,
              name: item.name,
              description: truncateString(item.description),
              imageSrc: item.imageSrc,
              city: item.city,
              rating: item.rating,
              clickCallback: (_, clickedItem) => { this._onItemClickedCallback(clickedItem); },
            },
          },
        }),
      );
    });
  }
}

customElements.define(CardList.tagName, CardList);
