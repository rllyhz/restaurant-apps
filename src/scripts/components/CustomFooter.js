export default class CustomFooter extends HTMLElement {
  static tagName = 'custom-footer';

  connectedCallback() {
    this._render();
  }

  _render() {
    const year = new Date().getFullYear();

    this.innerHTML = `
    <footer>
      <p>Copyright © ${year} - All rights reserved</p>
      <p>RestaurantApp</p>
    </footer>
  `;
  }
}

customElements.define(CustomFooter.tagName, CustomFooter);
