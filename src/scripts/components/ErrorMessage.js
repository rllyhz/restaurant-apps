export default class ErrorMessage extends HTMLElement {
  static tagName = 'error-message';

  set errorData({
    title, description, retryBtnText = null, retryBtnCallback = () => {}, enableRetry = true,
  }) {
    this._title = title;
    this._description = description;
    this._retryBtnText = retryBtnText;
    this._enableRetry = enableRetry;

    this._btnCallback = () => {
      retryBtnCallback();
    };

    this._render();
  }

  connectedCallback() {
    if (this._enableRetry) this.querySelector('.retry').addEventListener('click', this._btnCallback);
  }

  disconnectedCallback() {
    if (this._enableRetry) this.querySelector('.retry').removeEventListener('click', this._btnCallback);
  }

  _render() {
    this.innerHTML = `
      <p class='title'>${this._title}</p>
      <p class='description'>${this._description}</p>
      ${this._enableRetry ? `<button class='retry'>${this._retryBtnText}</button>` : ''}
    `;
  }
}

customElements.define(ErrorMessage.tagName, ErrorMessage);
