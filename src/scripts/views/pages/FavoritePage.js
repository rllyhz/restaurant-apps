import { appendPage, createElement, getRootPage } from '../../helpers/DomHelper';
import { setTitleApp, setDescriptionApp } from '../../helpers/AppHelper';
import DataHelper from '../../helpers/DataHelper';
import { UrlParser } from '../../helpers/RouteHelper';
import { observableOf } from '../../helpers/Extension';
import RestaurantSource from '../../data/RestaurantSource';
import { StringResource } from '../../globals/config';
import UIState from '../../helpers/UIState';

import CardList from '../../components/CardList';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingIndicator from '../../components/LoadingIndicator';

export default class FavoritePage {
  static async render() {
    setTitleApp(StringResource.title('Favorite Restaurants'));
    setDescriptionApp(StringResource.description('Favorite page, Favorites, Favorites Restaurants, Liked contents'));

    const rootPage = getRootPage();
    const contentPaddingSize = getComputedStyle(rootPage).getPropertyValue('--content-padding');
    rootPage.style.paddingTop = contentPaddingSize;
    rootPage.style.paddingBottom = contentPaddingSize;

    const activePath = UrlParser.parseActiveUrlWithCombiner();
    document.querySelector('app-bar').setActiveMenu(activePath);

    const favoriteRestaurantsObservable = observableOf({});

    favoriteRestaurantsObservable.observe((result) => {
      rootPage.innerHTML = '';

      if (result.state === UIState.LOADING) {
        FavoritePage.onLoading();
      } else if (result.state === UIState.ERROR) {
        FavoritePage.onError(StringResource.errorInternalDescriptionText, () => {
          RestaurantSource.getFavoriteRestaurants(favoriteRestaurantsObservable);
        });
      } else if (result.data.favoriteRestaurants.length <= 0) {
        FavoritePage.onEmptyData();
      } else {
        FavoritePage.onSuccess(result.data.favoriteRestaurants);
      }
    });

    // get favorite restaurants;
    RestaurantSource.getFavoriteRestaurants(favoriteRestaurantsObservable);
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
    const title = StringResource.emptyDataTitleText('Favorite Restaurants');
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

  static onSuccess(_favRestaurants) {
    const favRestaurants = _favRestaurants
      .reverse()
      .map((item) => DataHelper.favToModel(item));

    // Add heading
    appendPage(
      createElement({
        tagName: 'h1',
        innerText: 'Favorite Restaurants',
        styles: {
          textAlign: 'center',
        },
      }),
    );

    // Card list
    appendPage(
      createElement({
        tagName: CardList.tagName,
        classNames: 'favorite-restaurants',
        data: {
          detail: {
            listItem: favRestaurants,
            useHeading: false,
          },
        },
      }),
    );
  }
}
