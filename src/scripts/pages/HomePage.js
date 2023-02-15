import { appendPage, createElement, getRootPage } from '../helpers/DomHelper';
import getRestaurants from '../networks/Api';

import '../../styles/hero-card.css';
import '../../styles/card-list.css';
import HeroCard from '../components/HeroCard';
import CardList from '../components/CardList';

export default class HomePage {
  static path = '/';

  static async render() {
    const rootPage = getRootPage();
    const contentPaddingSize = getComputedStyle(rootPage).getPropertyValue('--content-padding');
    rootPage.style.paddingTop = contentPaddingSize;
    rootPage.style.paddingBottom = contentPaddingSize;

    // Hero card / Jumbotron
    appendPage(
      createElement({
        tagName: HeroCard.tagName,
        data: {
          heroData: {
            imageSrc: './images/heros/hero-image_2.jpg',
            imageAlt: 'Hero card image',
            tagline: 'Taste and Delicious',
            description: 'Find the best food and dishes from the best restaurants for your best preferences',
          },
        },
      }),
    );

    // Card List
    const restaurants = getRestaurants();
    appendPage(
      createElement({
        tagName: CardList.tagName,
        classNames: 'restaurants',
        dataset: {
          title: 'Recommended For You',
        },
        data: {
          adapterData: {
            listItem: restaurants,
            // eslint-disable-next-line no-alert
            onItemClickedCallback: (item) => { alert(`Clicked ${item.name}`); },
          },
        },
      }),
    );
  }
}
