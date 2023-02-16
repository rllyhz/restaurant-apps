export default class ErrorMessage extends HTMLElement {
  static tagName = 'error-message';

  set errorData({
    title, description, retryBtnText, retryBtnCallback,
  }) {
    this.title = title;
    this.description = description;
    this.retryBtnText = retryBtnText;
    this.btnCallback = () => {
      retryBtnCallback();
    };

    this._render();
  }

  connectedCallback() {
    this.querySelector('.retry').addEventListener('click', this.btnCallback);
  }

  disconnectedCallback() {
    this.querySelector('.retry').removeEventListener('click', this.btnCallback);
  }

  _render() {
    this.innerHTML = `
      <p class='title'>${this.title}</p>
      <p class='description'>${this.description}</p>
      <button class='retry'>${this.retryBtnText}</button>
    `;
  }
}

customElements.define(ErrorMessage.tagName, ErrorMessage);
