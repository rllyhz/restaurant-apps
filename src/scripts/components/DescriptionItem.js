export default class DescriptionItem extends HTMLElement {
  static tagName = 'description-item';

  set model(value) {
    this.data = value;
    this._render();
  }

  _render() {
    const {
      id,
      name,
      address,
      description,
      city,
      rating,
    } = this.data;

    this.dataset.id = id;

    this.innerHTML = `
      <div class='full-description'>
        <h2 class='name'>${name}🍽️🍴</h2>
        <p class='city-rating'>${city} City📌 •• Rating ${rating}⭐</p>
        <p class='address'>${address}</p>
        <p class='description'>${description}</p>
      </div>
    `;
  }
}

customElements.define(DescriptionItem.tagName, DescriptionItem);
