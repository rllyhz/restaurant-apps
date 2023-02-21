Feature('DetailPage');

Before(({ I }) => {
  I.amOnPage('/#/');
});

Scenario('making sure detail page showing properly', ({ I }) => {
  I.click(locate('card-list card-item').at(2).find('.card-detail a')
    .withText('See more'));

  I.seeElement('image-card');
  I.seeElement('description-item');
  I.seeElement('custom-chips');
  I.seeElement('customer-review');
  I.seeElement('fab-like-button');

  I.scrollTo('customer-review');
});

Scenario('liking and unliking a restaurant from favorites', ({ I }) => {
  I.click(locate('card-list card-item').at(2).find('.card-detail a')
    .withText('See more'));

  // unlike button not showing up
  I.dontSeeElement(locate('i.bx.bxs-like').first());

  // click like button
  I.click(locate('fab-like-button').first());

  // unlike button now showing up
  I.seeElement(locate('i.bx.bxs-like').first());

  // click unlike button
  I.click(locate('fab-like-button').first());
});

Scenario('post new review at specific restaurant successfully when online', ({ I }) => {
  const reviewExample = 'Testing post review from e2e testing!';

  I.click(locate('card-list card-item').at(2).find('.card-detail a')
    .withText('See more'));

  I.seeElement(locate('fab-like-button').first());

  I.scrollTo('custom-footer');

  // fill the input
  I.fillField('.give-review > textarea', reviewExample);
  // send review
  I.click(locate('.give-review > button').first());
  pause();
});
