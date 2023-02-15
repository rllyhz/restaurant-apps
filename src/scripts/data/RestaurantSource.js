import API_ENDPOINT from '../globals/api-endpoint';
import UIState from '../helpers/UIState';

export default class RestaurantSource {
  static async getRestaurants(observableData) {
    observableData.emit({ state: UIState.LOADING });

    fetch(API_ENDPOINT.GET_RESTAURANTS)
      .then((res) => res.json())
      .then((data) => {
        observableData.emit({
          state: UIState.SUCCESS,
          data,
        });
      })
      .catch((err) => {
        observableData.emit({
          state: UIState.ERROR,
          data: err,
        });
      });

    return observableData;
  }

  static async getDetailOf(id, observableData) {
    observableData.emit({ state: UIState.LOADING });

    fetch(API_ENDPOINT.DETAIL_RESTAURANT(id))
      .then((res) => res.json())
      .then((data) => {
        observableData.emit({
          state: UIState.SUCCESS,
          data,
        });
      })
      .catch((err) => {
        observableData.emit({
          state: UIState.ERROR,
          data: err,
        });
      });

    return observableData;
  }

  static async reviewRestaurant({ id, name, review }, observableData) {
    observableData.emit({ state: UIState.LOADING });

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
        observableData.emit({
          state: UIState.SUCCESS,
          data,
        });
      })
      .catch((err) => {
        observableData.emit({
          state: UIState.ERROR,
          data: err,
        });
      });

    return observableData;
  }
}
