import Restaurant from '../data/Restaurant';

const DummyData = {
  fakeRestaurants(total = 20) {
    const data = [];

    for (let index = 1; index <= total; index += 1) {
      data.push(
        new Restaurant(
          `id-${index}`,
          `Restaurant Name ${index}`,
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          'https://restaurant-api.dicoding.dev/images/medium/14',
          'Fake city',
          (Math.random() * 5).toFixed(1),
          'Jl. Fake Addres No.3',
          [
            {
              name: 'reviewer',
              review: 'Good!',
              date: '23 December 2023',
            },
          ],
          {
            foods: [
              { name: 'Rice' }, { name: 'Chicken' },
            ],
            drinks: [
              { name: 'Ice Cream' }, { name: 'Lemon Tea' },
            ],
          },
        ),
      );
    }

    return data;
  },
};

export default DummyData;
