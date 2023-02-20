import FavRestaurant from '../../src/scripts/data/FavRestaurant';
import Restaurant from '../../src/scripts/data/Restaurant';

const getDummyFavRestaurant = () => new FavRestaurant(
  'fav-restaurant-id-1',
  'fav-restaurant',
  'fav-restaurant description',
  'fav-restaurant imageSrc',
  'fav-restaurant city',
  4.5,
);

const getDummyRestaurant = () => new Restaurant(
  'restaurant-id-1',
  'restaurant',
  'restaurant description',
  'restaurant imageSrc',
  'restaurant city',
  4.5,
);

export { getDummyFavRestaurant, getDummyRestaurant };
