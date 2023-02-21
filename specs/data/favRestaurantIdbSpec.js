import FavRestaurantIdb from '../../src/scripts/data/FavRestaurantIdb';
import { getDummyFavRestaurant } from '../utils/dataFactories';

describe('FavRestaurantIdb', () => {
  it('should be able to add restaurant to favorites', async () => {
    const favRestaurant = getDummyFavRestaurant();
    await FavRestaurantIdb.putFavRestaurant(favRestaurant);

    const favRestaurants = await FavRestaurantIdb.getAllFavRestaurants();
    await FavRestaurantIdb.deleteFavRestaurant(favRestaurant.id);

    expect(favRestaurants).toBeTruthy();
    expect(favRestaurants.length)
      .toBeGreaterThan(0);
  });

  it('should be able to remove restaurant from favorites', async () => {
    const favRestaurant = getDummyFavRestaurant();
    await FavRestaurantIdb.putFavRestaurant(favRestaurant);

    let favRestaurants = await FavRestaurantIdb.getAllFavRestaurants();
    expect(favRestaurants.length)
      .toBeGreaterThan(0);

    await FavRestaurantIdb.deleteFavRestaurant(favRestaurant.id);
    favRestaurants = await FavRestaurantIdb.getAllFavRestaurants();

    expect(favRestaurants.length)
      .toEqual(0);
  });

  it('should return the exact same restaurant when adding new one', async () => {
    const expectedFavRestaurant = getDummyFavRestaurant();
    await FavRestaurantIdb.putFavRestaurant(expectedFavRestaurant);

    const favRestaurants = await FavRestaurantIdb.getAllFavRestaurants();
    await FavRestaurantIdb.deleteFavRestaurant(expectedFavRestaurant.id);

    expect(favRestaurants.length)
      .toBeGreaterThan(0);

    const data = favRestaurants[0];

    expect(data).toBeTruthy();
    expect(data.id).toEqual(expectedFavRestaurant.id);
    expect(data.name).toEqual(expectedFavRestaurant.name);
    expect(data.description).toEqual(expectedFavRestaurant.description);
    expect(data.imageSrc).toEqual(expectedFavRestaurant.imageSrc);
    expect(data.city).toEqual(expectedFavRestaurant.city);
    expect(data.rating).toEqual(expectedFavRestaurant.rating);
  });
});
