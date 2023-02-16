import { createElement } from '../helpers/DomHelper';
import DataHelper from '../helpers/DataHelper';
import CardItem from './CardItem';

export default class CardList extends HTMLElement {
  static tagName = 'card-list';

  set detail({ listItem, useHeading = true, headingVariant = 'h2' }) {
    this._items = listItem;
    this._useHeading = useHeading;
    this._headingVariant = headingVariant;
    this._render();
  }

  _createHeadingElem() {
    return '<'.concat(this._headingVariant).concat(' ')
      .concat('class=\'card-title\'>')
      .concat(this.dataset.title)
      .concat(`</${this._headingVariant}>`);
  }

  _render() {
    this.innerHTML = `
      <div class='container-card'>
        ${this._useHeading ? this._createHeadingElem() : ''}
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
              description: DataHelper.truncateString(item.description),
              imageSrc: item.imageSrc,
              city: item.city,
              rating: item.rating,
            },
          },
        }),
      );
    });
  }
}

customElements.define(CardList.tagName, CardList);
