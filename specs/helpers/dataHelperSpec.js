import { getDummyFavRestaurant, getDummyRestaurant } from '../utils/dataFactories';
import DataHelper from '../../src/scripts/helpers/DataHelper';
import Restaurant from '../../src/scripts/data/Restaurant';
import FavRestaurant from '../../src/scripts/data/FavRestaurant';

describe('DataHelper', () => {
  it('should convert restaurant object into favorite restaurant object', () => {
    const restaurant = getDummyRestaurant();

    const result = DataHelper.modelToFav(restaurant);

    expect(result).toBeInstanceOf(FavRestaurant);
  });

  it('should convert restaurant object into favorite restaurant object', () => {
    const favRestaurant = getDummyFavRestaurant();

    const result = DataHelper.favToModel(favRestaurant);

    expect(result).toBeInstanceOf(Restaurant);
  });

  it('should truncate the strings when reaching the maximum total words', () => {
    const dummyString = 'this is a dummy string text for testing purpose';
    const maxWords = 6;

    const result = DataHelper.truncateString(dummyString, maxWords);

    expect(result.includes('...')).toBeTrue();
  });

  it('should truncate the strings when not reaching the maximum total words', () => {
    const dummyString = 'this is a dummy string';
    const maxWords = 6;

    const result = DataHelper.truncateString(dummyString, maxWords);

    expect(result.includes('...')).toBeFalse();
  });
});
