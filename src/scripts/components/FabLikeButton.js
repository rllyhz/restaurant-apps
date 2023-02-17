export default class FabLikeButton extends HTMLElement {
  static tagName = 'fab-like-button';

  static Position = {
    TOP_RIGHT: 'top-right',
    TOP_LEFT: 'top-left',
    BOTTOM_RIGHT: 'bottom-right',
    BOTTOM_LEFT: 'bottom-left',
  };

  static Size = {
    SMALL: 'small',
    NORMAL: 'normal',
    LARGE: 'large',
  };

  set detail({
    itemName = 'Item',
    isLiked = false,
    toggleCallback = () => {},
    size = FabLikeButton.Size.SMALL,
    position = FabLikeButton.Position.BOTTOM_RIGHT,
  }) {
    this._itemName = itemName;
    this._isLiked = isLiked;
    this._position = position;
    this._size = size;

    this._clickedCallback = () => {
      this._isLiked = !this._isLiked;
      toggleCallback(this._isLiked);
      // re-render
      this._render();
    };

    this._render();
  }

  connectedCallback() {
    this.addEventListener('click', this._clickedCallback);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._clickedCallback);
  }

  _render() {
    this.setAttribute('tabIndex', '0');
    this.innerHTML = `
      ${this._isLiked ? '<i class=\'bx bxs-like\'></i>' : '<i class=\'bx bx-like\'></i>'}
    `;

    if (this._isLiked) {
      this.classList.add('liked');
      this.title = `Unlike ${this._itemName}`;
    } else {
      this.classList.remove('liked');
      this.title = `Like ${this._itemName}`;
    }

    this._setPosition();
    this._setSize();
  }

  _setSize() {
    if (this._size === FabLikeButton.Size.SMALL) {
      this.style.fontSize = '1rem';
      this.style.padding = '.8rem';
    } else if (this._size === FabLikeButton.Size.NORMAL) {
      this.style.fontSize = '1.3rem';
      this.style.padding = '1.15rem';
    } else {
      this.style.fontSize = '1.65rem';
      this.style.padding = '1.5rem';
    }
  }

  _setPosition() {
    this.style.top = 'unset';
    this.style.right = 'unset';
    this.style.bottom = 'unset';
    this.style.left = 'unset';

    if (this._position === FabLikeButton.Position.BOTTOM_RIGHT) {
      this.style.bottom = '0';
      this.style.right = '0';
    } else if (this._position === FabLikeButton.Position.BOTTOM_LEFT) {
      this.style.bottom = '0';
      this.style.left = '0';
    } else if (this._position === FabLikeButton.Position.TOP_LEFT) {
      this.style.top = '0';
      this.style.left = '0';
    } else {
      this.style.top = '0';
      this.style.right = '0';
    }
  }
}

customElements.define(FabLikeButton.tagName, FabLikeButton);
