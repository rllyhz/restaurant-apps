export default class HeroCard extends HTMLElement {
  static tagName = 'hero-card';

  set heroData({
    smallImageSrc = '', largeImageSrc = '', imageAlt = '', tagline = '', description = '',
  }) {
    this._render(smallImageSrc, largeImageSrc, imageAlt, tagline, description);
  }

  _render(smallImageSrc, largeImageSrc, imageAlt, tagline, description) {
    this.innerHTML = `
    <div class='hero-card-image'>
      <picture>
        <source media='(max-width: 700px)' srcset='${smallImageSrc}'>
        <img src='${largeImageSrc}' 
            alt='${imageAlt}'>
      </picture>
      <div class='hero-card-description'>
        <h1>${tagline}</h1>
        <p>${description}</p>
      </div>
    </div>
  `;
  }
}

customElements.define(HeroCard.tagName, HeroCard);
