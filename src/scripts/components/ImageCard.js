export default class ImageCard extends HTMLElement {
  static tagName = 'image-card';

  set imageData({ imageSrc, imageAlt }) {
    this.imageSrc = imageSrc;
    this.imageAlt = imageAlt;

    this._render();
  }

  _render() {
    this.innerHTML = `
      <img src='${this.imageSrc}' alt='${this.imageAlt}' />
    `;
  }
}

customElements.define(ImageCard.tagName, ImageCard);
