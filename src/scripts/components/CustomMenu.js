export default class Menu extends HTMLElement {
  static tagName = 'custom-menu';

  set menus({ foods, drinks }) {
    this.foods = foods;
    this.drinks = drinks;

    this._render();
  }

  _render() {
    this.innerHTML = `
      <div class='full-menu'>
        <p class='foods-title'>Foods</p>
        <div class='foods-container'></div>
        <p class='drinks-title'>Drinks</p>
        <div class='drinks-container'></div>
      </div>
    `;

    this.foods.forEach((food) => {
      const foodElem = document.createElement('span');
      foodElem.innerText = food.name;
      this.querySelector('.full-menu .foods-container').appendChild(foodElem);
    });

    this.drinks.forEach((drink) => {
      const drinkElem = document.createElement('span');
      drinkElem.innerText = drink.name;
      this.querySelector('.full-menu .drinks-container').appendChild(drinkElem);
    });
  }
}

customElements.define(Menu.tagName, Menu);
