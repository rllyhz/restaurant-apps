import { toPath } from '../helpers/RouteHelper';

export default class AppBar extends HTMLElement {
  static tagName = 'app-bar';

  set callbacks({ toggleDrawerCallback, onMenuItemClickedCallback }) {
    this._opened = false;

    this._toggleDrawerCallback = () => {
      this._opened = !this._opened;
      this._setTitle();
      toggleDrawerCallback();
    };

    this._menuItemClickedCallback = (e) => {
      e.preventDefault();
      this.querySelectorAll('.nav-menu .nav-list .nav-item > a').forEach((menuItemElem) => {
        menuItemElem.classList.remove('active');
      });
      e.target.classList.add('active');
      onMenuItemClickedCallback(e.target.href);
    };

    this._render();
    this._setTitle();
  }

  connectedCallback() {
    this.querySelector('.nav-toggle').addEventListener('click', this._toggleDrawerCallback);
    this.querySelectorAll('.nav-menu .nav-list .nav-item > a').forEach((menuItemElem) => {
      menuItemElem.addEventListener('click', this._menuItemClickedCallback);
    });
  }

  disconnectedCallback() {
    this.querySelector('.nav-toggle').removeEventListener('click', this._toggleDrawerCallback);
    this.querySelectorAll('.nav-menu .nav-list .nav-item > a').forEach((menuItemElem) => {
      menuItemElem.removeEventListener('click', this._menuItemClickedCallback);
    });
  }

  _render() {
    this.innerHTML = `
      <header tabIndex='-1'>
        <button class='nav-toggle'>
          <i class='bx bx-menu'></i>
        </button>
        <div class='nav-brand' title='Home'>
          <a href='${toPath('/')}'>RestaurantApp</a>
        </div>
        <nav class='nav-menu'>
          <ul class='nav-list'>
            <li class='nav-item'><a title='Home' href='${toPath('/')}'>Home</a></li>
            <li class='nav-item'><a title='Favorite Restaurants' href='${toPath('/favorite')}'>Favorite</a></li>
            <li class='nav-item'><a title='About Us' href='https://rllyhz.github.io/' target='_blank' rel='noreferrer'>About Us</a></li>
          </ul>
        </nav>
      </header>
    `;
  }

  setActiveMenu(activePath = '/') {
    this.querySelectorAll('.nav-menu .nav-list .nav-item > a').forEach((menuItem) => {
      menuItem.classList.remove('active');
    });

    if (activePath === '/favorite') {
      this.querySelector('.nav-menu .nav-list .nav-item:nth-child(2) > a').classList.add('active');
    } else {
      this.querySelector('.nav-menu .nav-list .nav-item:first-child > a').classList.add('active');
    }
  }

  _setTitle() {
    if (this._opened) {
      this.querySelector('.nav-toggle').title = 'Close Drawer';
    } else {
      this.querySelector('.nav-toggle').title = 'Open Drawer';
    }
  }
}

customElements.define(AppBar.tagName, AppBar);
