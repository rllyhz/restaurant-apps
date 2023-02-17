export default class DescriptionItem extends HTMLElement {
  static tagName = 'description-item';

  set detail({ model, headingId = '', isSkipToContentRef = false }) {
    this._headingId = headingId;
    this._isSkipToContentRef = isSkipToContentRef;
    this._data = model;
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
    } = this._data;

    this.dataset.id = id;

    this.innerHTML = `
      <div class='full-description'>
        <h1 id='${this._headingId}' ${this._isSkipToContentRef ? 'tabIndex=\'0\'' : ''} class='name'>${name}🍽️🍴</h1>
        <p class='city-rating'>${city} City📌 •• Rating ${rating}⭐</p>
        <p class='address'>${address}</p>
        <p class='description'>${description}</p>
      </div>
    `;
  }
}

customElements.define(DescriptionItem.tagName, DescriptionItem);
