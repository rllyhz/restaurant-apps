import { appendBody } from '../helpers/DomHelper';
import { getAppBarHeight, addRemValue, getPropertyValueOf } from '../helpers/StyleHelper';

const _getToastElem = () => document.querySelector('toast-message');
const _createToastElem = () => document.createElement('toast-message');
const _removeToastElem = () => document.body.removeChild(_getToastElem());

const _createToast = (message, backgroundColor, color, duration, size, position) => {
  if (_getToastElem()) {
    _removeToastElem();
  }

  const toastElem = _createToastElem();
  appendBody(toastElem);

  toastElem._create({
    message, duration, size, position, backgroundColor, color,
  });

  return toastElem;
};

export default class ToastMessage extends HTMLElement {
  static tagName = 'toast-message';

  static Position = {
    TOP: 'top',
    CENTER: 'center',
    BOTTOM: 'bottom',
  };

  static Duration = {
    SHORT: 'short',
    LONG: 'long',
  };

  static Size = {
    SMALL: 'small',
    NORMAL: 'normal',
    LARGE: 'large',
  };

  static isShowing() {
    const toastElem = _getToastElem();
    if (!toastElem) return false;
    return toastElem.isShowing();
  }

  static make({
    message = '',
    duration = ToastMessage.Duration.SHORT,
    size = ToastMessage.Size.SMALL,
    position = ToastMessage.Position.BOTTOM,
    backgroundColor = 'white',
    color = 'black',
  }) {
    return _createToast(message, backgroundColor, color, duration, size, position);
  }

  constructor() {
    super();
    this._isShowing = false;
    this._animationEndCallback = (e) => {
      if (e.animationName === 'fadein') {
        setTimeout(() => { this.dismiss(); }, this._duration);
      } else {
        this.classList.remove('dismiss');
        this.classList.remove('show');
      }
    };
  }

  isShowing() {
    return this._isShowing;
  }

  show() {
    if (!this._isShowing) {
      this.classList.add('show');
      this._isShowing = true;
    }
  }

  dismiss() {
    if (this._isShowing) {
      this.classList.add('dismiss');
      this._isShowing = false;
    }
  }

  _create({
    message = '',
    duration = ToastMessage.Duration,
    size = ToastMessage.Size.SMALL,
    position = ToastMessage.Position.BOTTOM,
    backgroundColor,
    color,
  }) {
    this._message = message;
    this._duration = duration;
    this._position = position;
    this._size = size;
    this._backgroundColor = backgroundColor;
    this._color = color;

    this._duration = 3000;
    if (duration === ToastMessage.Duration.LONG) {
      this._duration = 5000;
    }

    this._render();
  }

  connectedCallback() {
    this.addEventListener('animationend', this._animationEndCallback);
  }

  disconnectedCallback() {
    this.removeEventListener('animationend', this._animationEndCallback);
  }

  _render() {
    this.innerText = this._message;
    this.style.backgroundColor = this._backgroundColor;
    this.style.color = this._color;

    this._setPosition();
    this._setSize();
  }

  _setSize() {
    if (this._size === ToastMessage.Size.SMALL) {
      //
    }
  }

  _setPosition() {
    this.style.top = 'unset';
    this.style.bottom = 'unset';
    this.style.right = '0';
    this.style.left = '0';

    if (this._position === ToastMessage.Position.TOP) {
      const appBarHeightInRem = getAppBarHeight();
      const paddingContentSize = getPropertyValueOf(document.body, '--content-padding');
      const expectedMarginTop = addRemValue(appBarHeightInRem, paddingContentSize);
      this.style.marginTop = expectedMarginTop;
      this.style.top = '0';
    } else if (this._position === ToastMessage.Position.BOTTOM) {
      const expectedMarginBottom = getPropertyValueOf(document.body, '--content-padding');
      this.style.bottom = '0';
      this.style.marginBottom = expectedMarginBottom;
    } else {
      this.style.top = '0';
      this.style.bottom = '0';
    }
  }
}

customElements.define(ToastMessage.tagName, ToastMessage);
