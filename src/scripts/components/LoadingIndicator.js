export default class LoadingIndicator extends HTMLElement {
  static tagName = 'loading-indicator';

  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
      <div class='indicator'></div>
    `;
  }
}

customElements.define(LoadingIndicator.tagName, LoadingIndicator);
