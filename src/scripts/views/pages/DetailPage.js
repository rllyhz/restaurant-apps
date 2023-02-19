import { appendPage, createElement, getRootPage } from '../../helpers/DomHelper';
import { setTitleApp, setDescriptionApp } from '../../helpers/AppHelper';
import { UrlParser } from '../../helpers/RouteHelper';
import DataHelper from '../../helpers/DataHelper';
import { observableOf } from '../../helpers/Extension';
import RestaurantSource from '../../data/RestaurantSource';
import Restaurant from '../../data/Restaurant';
import { CONFIG, StringResource } from '../../globals/config';
import UIState from '../../helpers/UIState';

import ImageCard from '../../components/ImageCard';
import DescriptionItem from '../../components/DescriptionItem';
import CustomChips from '../../components/CustomChips';
import CustomerReview from '../../components/CustomerReview';
import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorMessage from '../../components/ErrorMessage';
import FabLikeButton from '../../components/FabLikeButton';
import ToastMessage from '../../components/ToastMessage';

export default class DetailPage {
  static restaurantObservable = observableOf({});

  static addReviewObservable = observableOf({});

  static fakeName = 'John';

  static getId = () => UrlParser.parseActiveUrlWithoutCombiner().id;

  static async render() {
    setTitleApp(StringResource.title('Detail'));
    setDescriptionApp(StringResource.description('Detail page, Restaurant detail info'));

    const rootPage = getRootPage();
    const contentPaddingSize = getComputedStyle(rootPage).getPropertyValue('--content-padding');
    rootPage.style.paddingTop = contentPaddingSize;
    rootPage.style.paddingBottom = contentPaddingSize;
    rootPage.style.paddingLeft = contentPaddingSize;
    rootPage.style.paddingRight = contentPaddingSize;

    DetailPage.restaurantObservable.observe(
      DetailPage.restaurantObserver,
    );
    DetailPage.addReviewObservable.observe(
      DetailPage.addReviewObserver,
    );

    // initially fetch restaurant detail
    const id = DetailPage.getId();
    RestaurantSource.getDetailOf(id, DetailPage.restaurantObservable);
  }

  static restaurantObserver(result) {
    getRootPage().innerHTML = '';

    const id = DetailPage.getId();

    if (result.state === UIState.LOADING) {
      DetailPage.onLoading();
    } else if (result.state === UIState.ERROR) {
      DetailPage.onError(StringResource.errorConnectionDescriptionText, () => {
        RestaurantSource.getDetailOf(id, DetailPage.restaurantObservable);
      });
    } else if (result.data.error) {
      DetailPage.onError(StringResource.errorRequestAPIDescriptionText, () => {
        RestaurantSource.getDetailOf(id, DetailPage.restaurantObservable);
      });
    } else {
      DetailPage.onSuccess(result.data, (itemId, review) => {
        RestaurantSource.reviewRestaurant(
          {
            id: itemId,
            review,
            name: DetailPage.fakeName,
          },
          DetailPage.addReviewObservable,
        );
      });
    }
  }

  static addReviewObserver(result) {
    const customReviewerElem = getRootPage().querySelector(CustomerReview.tagName);

    if (result.state === UIState.LOADING) {
      customReviewerElem.loadingUI();
    } else if (result.state === UIState.ERROR) {
      customReviewerElem.errorUI();
      DetailPage.showToast(StringResource.failedToAddReviewsToastMessage);
    } else if (result.data.error) {
      customReviewerElem.errorUI();
      DetailPage.showToast(StringResource.failedToAddReviewsToastMessage);
    } else {
      const { customerReviews } = result.data;
      DetailPage.onUpdateReviews(customerReviews);
      customReviewerElem.resetInput();
      DetailPage.showToast(StringResource.successfullyAddedReviewsToastMessage);
    }
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

  static async onSuccess(data, onAddNewReview = () => {}) {
    const {
      id, name, description, pictureId, city, rating, address, customerReviews, menus,
    } = data.restaurant;

    const restaurant = new Restaurant(
      id,
      name,
      description,
      `${CONFIG.BASE_IMAGE_LARGE}${pictureId}`,
      city,
      rating,
      address,
      customerReviews,
      menus,
    );

    appendPage(
      createElement({
        tagName: ImageCard.tagName,
        data: {
          imageData: {
            imageSrc: restaurant.imageSrc,
            imageAlt: restaurant.name,
          },
        },
      }),
    );

    appendPage(
      createElement({
        tagName: DescriptionItem.tagName,
        data: {
          detail: {
            model: restaurant,
            isSkipToContentRef: true,
            headingId: 'skip-to-content',
          },
        },
      }),
    );

    appendPage(
      createElement({
        tagName: CustomChips.tagName,
        data: {
          detail: {
            title: 'Foods',
            items: restaurant.menus.foods.map((food) => food.name),
          },
        },
      }),
    );
    appendPage(
      createElement({
        tagName: CustomChips.tagName,
        data: {
          detail: {
            title: 'Drinks',
            items: restaurant.menus.drinks.map((drink) => drink.name),
          },
        },
      }),
    );

    appendPage(
      createElement({
        tagName: CustomerReview.tagName,
        data: {
          detail: {
            reviews: restaurant.customerReviews,
            onAddReviewCallback: (review) => {
              if (window.navigator.onLine) {
                onAddNewReview(restaurant.id, review);
              } else {
                DetailPage.showToast(StringResource.noConnectionToastMessage);
              }
            },
          },
        },
      }),
    );

    // Add FabLikeButton
    const isLiked = await RestaurantSource.isRestaurantAlreadyLiked(restaurant.id);

    appendPage(
      createElement({
        tagName: FabLikeButton.tagName,
        data: {
          detail: {
            isLiked,
            position: FabLikeButton.Position.BOTTOM_RIGHT,
            size: FabLikeButton.Size.NORMAL,
            itemName: 'Restaurant',
            toggleCallback: (_isLiked) => {
              if (_isLiked) {
                RestaurantSource.addToFavorite(
                  DataHelper.modelToFav(restaurant),
                );
                DetailPage.showToast(StringResource.successfullyLikedToastMessage);
              } else {
                RestaurantSource.deleteFromFavorite(restaurant.id);
                DetailPage.showToast(StringResource.successfullyUnLikedToastMessage);
              }
            },
          },
        },
      }),
    );
    //
  }

  static onUpdateReviews(customerReviews) {
    const { name, review, date } = customerReviews.pop();
    const customReviewerElem = getRootPage().querySelector(CustomerReview.tagName);

    customReviewerElem.addReview(name, review, date);
  }

  static showToast(message) {
    ToastMessage.make({
      message,
    }).show();
  }
}
