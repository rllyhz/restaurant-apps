import { toPath } from '../helpers/RouteHelper';

export default class AppBar extends HTMLElement {
  static tagName = 'app-bar';

  set toggleDrawerCallback(newCallback) {
    this._toggleDrawerCallback = newCallback;
    this._render();
  }

  connectedCallback() {
    this.querySelector('.nav-toggle').addEventListener('click', this._toggleDrawerCallback);
  }

  disconnectedCallback() {
    this.querySelector('.nav-toggle').removeEventListener('click', this._toggleDrawerCallback);
  }

  _render() {
    this.innerHTML = `
      <header tabIndex='-1'>
        <button class='nav-toggle'>
          <i class='bx bx-menu'></i>
        </button>
        <div class='nav-brand'>
          <a href='${toPath('/')}'>RestaurantApp</a>
        </div>
        <nav class='nav-menu'>
          <ul class='nav-list'>
            <li class='nav-item'><a href='${toPath('/')}'>Home</a></li>
            <li class='nav-item'><a href='${toPath('/favorite')}'>Favorite</a></li>
            <li class='nav-item'><a href='https://rllyhz.github.io/' target='_link'>About Us</a></li>
          </ul>
        </nav>
      </header>
    `;
  }
}

customElements.define(AppBar.tagName, AppBar);
