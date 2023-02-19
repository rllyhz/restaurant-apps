export default class ImageCard extends HTMLElement {
  static tagName = 'image-card';

  set imageData({ imageSrc, imageAlt }) {
    this.imageSrc = imageSrc;
    this.imageAlt = imageAlt;

    this._render();
  }

  _render() {
    this.innerHTML = `
      <img src='./images/placeholders/big_card_placeholder.jpg' data-src='${this.imageSrc}' alt='${this.imageAlt}' class='lazyload' />
    `;
  }
}

customElements.define(ImageCard.tagName, ImageCard);
