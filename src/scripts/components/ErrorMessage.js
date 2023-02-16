export default class ErrorMessage extends HTMLElement {
  static tagName = 'error-message';

  set errorData({
    title, description, retryBtnText = null, retryBtnCallback = () => {}, enableRetry = true,
  }) {
    this.title = title;
    this.description = description;
    this.retryBtnText = retryBtnText;
    this.enableRetry = enableRetry;

    this.btnCallback = () => {
      retryBtnCallback();
    };

    this._render();
  }

  connectedCallback() {
    if (this.enableRetry) this.querySelector('.retry').addEventListener('click', this.btnCallback);
  }

  disconnectedCallback() {
    if (this.enableRetry) this.querySelector('.retry').removeEventListener('click', this.btnCallback);
  }

  _render() {
    this.innerHTML = `
      <p class='title'>${this.title}</p>
      <p class='description'>${this.description}</p>
      ${this.enableRetry ? `<button class='retry'>${this.retryBtnText}</button>` : ''}
    `;
  }
}

customElements.define(ErrorMessage.tagName, ErrorMessage);
