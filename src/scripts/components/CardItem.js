import { toPath } from '../helpers/RouteHelper';

export default class CardItem extends HTMLElement {
  static tagName = 'card-item';

  set params({
    id, name, description, imageSrc, city, rating,
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageSrc = imageSrc;
    this.city = city;
    this.rating = rating;

    this._render();
  }

  _render() {
    this.innerHTML = `
    <div class='card-content' data-id='${this.id}'>
    <div class='card-image'>
      <img src='./images/placeholders/small_card_placeholder.jpg' data-src='${this.imageSrc}' alt='${this.name}' class='lazyload' />
    </div>
    <div class='card-detail'>
        <p>${this.name}🍽️🍴</p>
        <p>${this.city} • ${this.rating}⭐</p>
        <p>${this.description}</p>
        <a href='${toPath(`/detail/${this.id}`)}'>See more</a>
      </div>
    </div>
    `;
  }
}

customElements.define(CardItem.tagName, CardItem);
