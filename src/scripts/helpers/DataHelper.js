import FavRestaurant from '../data/FavRestaurant';
import Restaurant from '../data/Restaurant';

const DataHelper = {
  modelToFav(model) {
    return new FavRestaurant(
      model.id,
      model.name,
      model.description,
      model.imageSrc,
      model.city,
      model.rating,
    );
  },

  favToModel(fav) {
    return new Restaurant(
      fav.id,
      fav.name,
      fav.description,
      fav.imageSrc,
      fav.city,
      fav.rating,
    );
  },

  truncateString(stringData, totalWords = 20) {
    const result = [];
    const words = stringData.split(' ');

    if (words.length <= totalWords) return stringData;

    for (let index = 0; index < words.length; index += 1) {
      if (index < totalWords) {
        result.push(words[index]);
      } else {
        break;
      }
    }

    return result.join(' ').concat('...');
  },
  //
};

export default DataHelper;
