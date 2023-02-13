export default class CustomFooter extends HTMLElement {
  static tagName = 'custom-footer'

  constructor() {
    super();
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    let year = new Date().getFullYear()

    this.innerHTML = `
    <footer>
      <p>Copyright © ${year} - All rights reserved</p>
      <p>RestaurantApp</p>
    </footer>
  `;
  }
}

customElements.define(CustomFooter.tagName, CustomFooter);