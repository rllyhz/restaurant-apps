export default class AppBar extends HTMLElement {
  static tagName = 'app-bar'

  constructor() {
    super();
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
    <header>
      <a class='nav-brand' href='/'>RestaurantApp</a>
      <nav>
        <ul>
          <li><a href='/'>Home</a></li>
          <li><a href='/#'>Favorite</a></li>
          <li><a href='https://rllyhz.github.io/'>About Us</a></li>
        </ul>
      </nav>
    </header>
  `;
  }
}

customElements.define(AppBar.tagName, AppBar);