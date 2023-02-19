import { appendPage, createElement, getRootPage } from '../../helpers/DomHelper';
import { setDescriptionApp, setTitleApp } from '../../helpers/AppHelper';
import { observableOf } from '../../helpers/Extension';
import RestaurantSource from '../../data/RestaurantSource';
import Restaurant from '../../data/Restaurant';
import { CONFIG, StringResource } from '../../globals/config';
import UIState from '../../helpers/UIState';

import HeroCard from '../../components/HeroCard';
import CardList from '../../components/CardList';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingIndicator from '../../components/LoadingIndicator';

export default class HomePage {
  static async render() {
    setTitleApp(StringResource.title('Home'));
    setDescriptionApp(StringResource.description('Detail page, Recommendation for you, Restaurants'));

    const rootPage = getRootPage();
    const contentPaddingSize = getComputedStyle(rootPage).getPropertyValue('--content-padding');
    rootPage.style.paddingTop = contentPaddingSize;
    rootPage.style.paddingBottom = contentPaddingSize;

    const restaurantsObservable = observableOf({});

    restaurantsObservable.observe((result) => {
      rootPage.innerHTML = '';

      if (result.state === UIState.LOADING) {
        HomePage.onLoading();
      } else if (result.state === UIState.ERROR) {
        console.log(result.data);
        HomePage.onError(StringResource.errorConnectionDescriptionText, () => {
          RestaurantSource.getRestaurants(restaurantsObservable);
        });
      } else if (result.data.error) {
        HomePage.onError(StringResource.errorRequestAPIDescriptionText, () => {
          RestaurantSource.getRestaurants(restaurantsObservable);
        });
      } else if (result.data.restaurants.length <= 0) {
        HomePage.onEmptyData();
      } else {
        HomePage.onSuccess(result.data.restaurants);
      }
    });

    RestaurantSource.getRestaurants(restaurantsObservable);
  }

  static onLoading() {
    appendPage(
      createElement({
        tagName: LoadingIndicator.tagName,
      }),
    );
  }

  static onError(message, onRetry = () => {}) {
    const title = StringResource.errorTitleText;
    const description = message;

    appendPage(
      createElement({
        tagName: ErrorMessage.tagName,
        data: {
          errorData: {
            title,
            description,
            retryBtnText: StringResource.errorBtnRetryText,
            retryBtnCallback: onRetry,
          },
        },
      }),
    );
  }

  static onEmptyData() {
    const title = StringResource.emptyDataTitleText('Restaurants');
    const description = StringResource.emptyDataDescriptionText;

    appendPage(
      createElement({
        tagName: ErrorMessage.tagName,
        data: {
          errorData: {
            title,
            description,
            enableRetry: false,
          },
        },
      }),
    );
  }

  static onSuccess(_restaurants) {
    const restaurants = _restaurants.map((item) => new Restaurant(
      item.id,
      item.name,
      item.description,
      `${CONFIG.BASE_IMAGE_MEDIUM}${item.pictureId}`,
      item.city,
      item.rating,
    ));

    // Hero card / Jumbotron
    appendPage(
      createElement({
        tagName: HeroCard.tagName,
        data: {
          heroData: {
            smallImageSrc: './images/heros/hero-image_2-small.jpg',
            largeImageSrc: './images/heros/hero-image_2-large.jpg',
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
        data: {
          detail: {
            listItem: restaurants,
            headingText: 'Recommended For You',
            headingVariant: 'h2',
            headingId: 'skip-to-content',
            isSkipToContentRef: true,
          },
        },
      }),
    );
  }
}
