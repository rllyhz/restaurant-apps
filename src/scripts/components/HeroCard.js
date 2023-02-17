export default class HeroCard extends HTMLElement {
  static tagName = 'hero-card';

  set heroData({
    imageSrc = '', imageAlt = '', tagline = '', description = '',
  }) {
    this._render(imageSrc, imageAlt, tagline, description);
  }

  _render(imageSrc, imageAlt, tagline, description) {
    this.innerHTML = `
    <div class='hero-card-image'>
      <img src='${imageSrc}' alt='${imageAlt}' />
      <div class='hero-card-description'>
        <h1>${tagline}</h1>
        <p>${description}</p>
      </div>
    </div>
  `;
  }
}

customElements.define(HeroCard.tagName, HeroCard);
