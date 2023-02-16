import { appendPage, createElement, getRootPage } from '../../helpers/DomHelper';
import { UrlParser } from '../../helpers/RouteHelper';
import { observableOf } from '../../helpers/Extension';
import RestaurantSource from '../../data/RestaurantSource';
import Restaurant from '../../data/Restaurant';
import { CONFIG, StringResource } from '../../globals/config';
import UIState from '../../helpers/UIState';

import ImageCard from '../../components/ImageCard';
import DescriptionItem from '../../components/DescriptionItem';
import CustomMenu from '../../components/CustomMenu';
import CustomerReview from '../../components/CustomerReview';
import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorMessage from '../../components/ErrorMessage';
import FabLikeButton from '../../components/FabLikeButton';

export default class DetailPage {
  static restaurantObservable = observableOf({});

  static addReviewObservable = observableOf({});

  static fakeName = 'John';

  static getId = () => UrlParser.parseActiveUrlWithoutCombiner().id;

  static async render() {
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
    } else if (result.data.error) {
      customReviewerElem.errorUI();
    } else {
      const { customerReviews } = result.data;
      DetailPage.onUpdateReviews(customerReviews);
      customReviewerElem.resetInput();
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

  static onSuccess(data, onAddNewReview = () => {}) {
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
          model: restaurant,
        },
      }),
    );

    appendPage(
      createElement({
        tagName: CustomMenu.tagName,
        data: {
          menus: restaurant.menus,
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
              onAddNewReview(restaurant.id, review);
            },
          },
        },
      }),
    );

    // Add FabLikeButton
    appendPage(
      createElement({
        tagName: FabLikeButton.tagName,
        data: {
          detail: {
            isLiked: false,
            position: FabLikeButton.Position.BOTTOM_RIGHT,
            size: FabLikeButton.Size.NORMAL,
            toggleCallback: (isLiked) => { console.log(isLiked); },
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
}
