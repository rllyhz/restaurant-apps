import Restaurant from "../data/Restaurant";

export default class CardItem extends HTMLElement {
  static tagName = 'card-item'
  
  set params({ id, name, description, pictureId, city, rating, onClickedCallback }) {
    this._render(id, name, description, pictureId, city, rating, onClickedCallback);
  }

  _render(id, name, description, pictureId, city, rating, onClickedCallback) {
    this.innerHTML = `
    <div class='card-content' data-id='${id}'>
    <div class='card-image'>
      <img src='${pictureId}' alt='${name}' />
    </div>
    <div class='card-detail'>
        <p>${name}🍽️🍴</p>
        <p>${city} • ${rating}⭐</p>
        <p>${description}</p>
        <button>See more</button>
      </div>
    </div>
    `;

    this.querySelector('.card-detail button').addEventListener('click', event => {
      onClickedCallback(
        new Restaurant(id, name, description, pictureId, city, rating),
        event
      );
    });
  }
}

customElements.define(CardItem.tagName, CardItem);