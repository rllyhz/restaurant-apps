import { toPath } from '../helpers/RouteHelper';
import Restaurant from '../data/Restaurant';

export default class CardItem extends HTMLElement {
  static tagName = 'card-item';

  set params({
    id, name, description, imageSrc, city, rating, clickCallback,
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageSrc = imageSrc;
    this.city = city;
    this.rating = rating;

    this.itemClickedListener = (event) => {
      clickCallback(
        event,
        new Restaurant(
          this.id,
          this.name,
          this.description,
          this.imageSrc,
          this.city,
          this.rating,
        ),
      );
    };

    this._render();
  }

  connectedCallback() {
    this.querySelector('.card-detail a').addEventListener('click', this.itemClickedListener);
  }

  disconnectedCallback() {
    this.querySelector('.card-detail a').removeEventListener('click', this.itemClickedListener);
  }

  _render() {
    this.innerHTML = `
    <div class='card-content' data-id='${this.id}'>
    <div class='card-image'>
      <img src='${this.imageSrc}' alt='${this.name}' />
    </div>
    <div class='card-detail'>
        <p>${this.name}🍽️🍴</p>
        <p>${this.city} • ${this.rating}⭐</p>
        <p>${this.description}</p>
        <a href='${toPath('/detail')}'>See more</a>
      </div>
    </div>
    `;
  }
}

customElements.define(CardItem.tagName, CardItem);
