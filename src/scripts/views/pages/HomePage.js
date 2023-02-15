import { appendPage, createElement, getRootPage } from '../../helpers/DomHelper';
import { observableOf } from '../../helpers/Extension';
import RestaurantSource from '../../data/RestaurantSource';
import Restaurant from '../../data/Restaurant';
import CONFIG from '../../globals/config';
import UIState from '../../helpers/UIState';

import '../../../styles/hero-card.css';
import '../../../styles/card-list.css';
import '../../../styles/loading-indicator.css';
import HeroCard from '../../components/HeroCard';
import CardList from '../../components/CardList';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingIndicator from '../../components/LoadingIndicator';

export default class HomePage {
  static async render() {
    const rootPage = getRootPage();
    const contentPaddingSize = getComputedStyle(rootPage).getPropertyValue('--content-padding');
    rootPage.style.paddingTop = contentPaddingSize;
    rootPage.style.paddingBottom = contentPaddingSize;

    const observableRestaurants = observableOf({});

    observableRestaurants.observe((result) => {
      rootPage.innerHTML = '';

      if (result.state === UIState.LOADING) {
        HomePage.onLoading();
      } else if (result.state === UIState.ERROR) {
        HomePage.onError(result.data, () => {
          RestaurantSource.getRestaurants(observableRestaurants);
        });
      } else {
        HomePage.onSuccess(result.data);
      }
    });

    RestaurantSource.getRestaurants(observableRestaurants);
  }

  static onLoading() {
    appendPage(
      createElement({
        tagName: LoadingIndicator.tagName,
      }),
    );
  }

  static onError(_, onRetry = () => {}) {
    const title = 'Opsss... Something went wrong';
    const description = 'It seemed like you\'re currently offline. Please check your connection and try again later.';

    appendPage(
      createElement({
        tagName: ErrorMessage.tagName,
        data: {
          errorData: {
            title,
            description,
            retryBtnText: 'Refresh',
            retryBtnCallback: onRetry,
          },
        },
      }),
    );
  }

  static onSuccess(data) {
    if (data.error) {
      HomePage.onError(data.message);
      return;
    }

    let { restaurants } = data;
    restaurants = restaurants.map((item) => new Restaurant(
      item.id,
      item.name,
      item.description,
      `${CONFIG.BASE_IMAGE_MEDIUM}${item.pictureId}`,
      item.city,
      item.rating,
      null,
      [],
    ));

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

    // Card list
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
