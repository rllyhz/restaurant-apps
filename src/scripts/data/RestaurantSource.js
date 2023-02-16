import API_ENDPOINT from '../globals/api-endpoint';
import FavRestaurantIdb from './FavRestaurantIdb';
import UIState from '../helpers/UIState';

export default class RestaurantSource {
  static async getRestaurants(observable) {
    observable.emit({ state: UIState.LOADING });

    fetch(API_ENDPOINT.GET_RESTAURANTS)
      .then((res) => res.json())
      .then((data) => {
        observable.emit({
          state: UIState.SUCCESS,
          data,
        });
      })
      .catch((err) => {
        observable.emit({
          state: UIState.ERROR,
          data: err,
        });
      });

    return observable;
  }

  static async getDetailOf(id, observable) {
    observable.emit({ state: UIState.LOADING });

    fetch(API_ENDPOINT.DETAIL_RESTAURANT(id))
      .then((res) => res.json())
      .then((data) => {
        observable.emit({
          state: UIState.SUCCESS,
          data,
        });
      })
      .catch((err) => {
        observable.emit({
          state: UIState.ERROR,
          data: err,
        });
      });

    return observable;
  }

  static async reviewRestaurant({ id, name, review }, observable) {
    observable.emit({ state: UIState.LOADING });

    fetch(API_ENDPOINT.ADD_NEW_REVIEW, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id, name, review,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        observable.emit({
          state: UIState.SUCCESS,
          data,
        });
      })
      .catch((err) => {
        observable.emit({
          state: UIState.ERROR,
          data: err,
        });
      });

    return observable;
  }

  static async getFavoriteRestaurants(observable) {
    observable.emit({ state: UIState.LOADING });

    // simulate loading
    setTimeout(async () => {
      try {
        const favoriteRestaurants = await FavRestaurantIdb.getAllFavRestaurants();
        observable.emit({
          state: UIState.SUCCESS,
          data: {
            favoriteRestaurants,
          },
        });
      } catch (exception) {
        observable.emit({ state: UIState.ERROR });
        console.log(exception);
      }
    }, 1000);

    return observable;
  }

  static async addToFavorite(newFavRestaurant) {
    await FavRestaurantIdb.putFavRestaurant(newFavRestaurant);
  }

  static async deleteFromFavorite(favRestaurant) {
    await FavRestaurantIdb.deleteFavRestaurant(favRestaurant);
  }

  static async isRestaurantAlreadyLiked(id) {
    const favRestaurant = await FavRestaurantIdb.getFavRestaurant(id);
    return !!favRestaurant;
  }
}
