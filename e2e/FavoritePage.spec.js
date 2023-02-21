const assert = require('assert');

Feature('FavoritePage');

Before(({ I }) => {
  I.amOnPage('/#/');
});

Scenario('making sure favorite page showing empty data message when there is no favorite ones', ({ I }) => {
  I.amOnPage('/#/favorite');
  I.see('Favorite Restaurants are still empty', locate('.title').first());
  I.see('Try add some to place here', locate('.description').first());
});

Scenario('making sure favorite page showing proper UI when liking or unliking restaurant', async ({ I }) => {
  const restaurantItemLocator = locate('card-list card-item').first();
  const restaurantTitle = await I.grabTextFrom(
    restaurantItemLocator.find('.card-detail p').first(),
  );

  I.click(restaurantItemLocator.find('.card-detail a')
    .withText('See more'));

  // make sure currently in detail page
  I.seeElement('image-card');
  I.seeElement('fab-like-button');
  I.see(restaurantTitle);

  // get detail page url for navigating back later
  const detailPageUrl = await I.grabCurrentUrl();

  I.dontSeeElement(locate('i.bx.bxs-like').first());
  // click fab like button to like
  I.click(locate('fab-like-button').first());
  // check unlike button showing up
  I.seeElement(locate('i.bx.bxs-like').first());

  // go to favorite page
  I.amOnPage('/#/favorite');

  // make sure favorite list showing up
  I.seeElement('card-list.favorite-restaurants');
  I.see(restaurantTitle);

  const favRestaurantItemLocator = locate('card-list card-item').first();
  const favRestaurantTitle = await I.grabTextFrom(
    favRestaurantItemLocator.find('.card-detail p').first(),
  );

  // and empty UI not showing up
  I.dontSeeElement('error-message');
  I.dontSee('Favorite Restaurants are still empty');

  // back to detail
  I.amOnPage(detailPageUrl);
  I.seeElement('fab-like-button'); // make sure already go back to the detail page
  I.see(restaurantTitle);

  I.dontSeeElement(locate('i.bx.bx-like').first());
  // click fab like button to unlike
  I.click(locate('fab-like-button').first());
  // check like button showing up
  I.seeElement(locate('i.bx.bx-like').first());

  // go to favorite page again
  I.amOnPage('/#/favorite');
  // make sure favorite list not showing up anymore
  I.dontSeeElement('card-list.favorite-restaurants');
  // but empty message, instead
  I.seeElement('error-message');
  I.see('Favorite Restaurants are still empty');

  // check restaurant title and fav restaurant title
  assert.strictEqual(restaurantTitle, favRestaurantTitle);
});
