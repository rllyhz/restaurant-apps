export default class HeroCard extends HTMLElement {
  static tagName = 'hero-card'

  constructor() {
    super();
  }

  set imageData({src = '', alt = ''}) {
    this._render(src, alt);
  }

  _render(src, alt) {
    this.innerHTML = `
    <div class='card-image'>
      <img src='${src}' alt='${alt}' />
      <div class='card-description'>
        <h2>Taste and Delicious</h2>
        <p>Find the best food and dishes for your best preferences</p>
      </div>
    </div>
  `;
  }
}

customElements.define(HeroCard.tagName, HeroCard);