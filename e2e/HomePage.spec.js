Feature('HomePage');

Before(({ I }) => {
  I.amOnPage('/#/');
});

Scenario('making sure app shell showing', ({ I }) => {
  I.seeElement('app-bar');
  I.seeElement('#root');
  I.seeElement('custom-footer');
});

Scenario('making sure home page showing the scrollable restaurants list and click one item', ({ I }) => {
  I.seeElement('hero-card');
  I.see('Recommended For You', '#skip-to-content');

  I.seeElement('card-list');
  I.seeElement('card-list card-item');
  I.seeElement('card-list card-item .card-image');

  I.scrollTo(locate('card-list card-item').last());

  I.click(locate('card-list card-item').at(2).find('.card-detail a')
    .withText('See more'));

  I.seeElement('fab-like-button');
});
