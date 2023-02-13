export default class HeroCard extends HTMLElement {
  static tagName = 'hero-card'

  constructor() {
    super();
  }

  set heroData({imageSrc = '', imageAlt = '', tagline = '', description = ''}) {
    this._render(imageSrc, imageAlt, tagline, description);
  }

  _render(imageSrc, imageAlt, tagline, description) {
    this.innerHTML = `
    <div class='card-image'>
      <img src='${imageSrc}' alt='${imageAlt}' />
      <div class='card-description'>
        <h2>${tagline}</h2>
        <p>${description}</p>
      </div>
    </div>
  `;
  }
}

customElements.define(HeroCard.tagName, HeroCard);