export default class AppBar extends HTMLElement {
  static tagName = 'app-bar'

  constructor() {
    super();
  }

  set toggleDrawerCallback(newCallback) {
    this._toggleDrawerCallback = newCallback;
    this._render();
  }

  _render() {
    this.innerHTML = `
    <header tabIndex='-1'>
      <button class='nav-toggle'>
        <i class='bx bx-menu'></i>
      </button>
      <div class='nav-brand'>
        <a href='/'>RestaurantApp</a>
      </div>
      <nav class='nav-menu'>
        <ul class='nav-list'>
          <li class='nav-item'><a href='/'>Home</a></li>
          <li class='nav-item'><a href='/#'>Favorite</a></li>
          <li class='nav-item'><a href='https://rllyhz.github.io/'>About Us</a></li>
        </ul>
      </nav>
    </header>
  `;

  this.querySelector('.nav-toggle').addEventListener('click', this._toggleDrawerCallback);
  }
}

customElements.define(AppBar.tagName, AppBar);