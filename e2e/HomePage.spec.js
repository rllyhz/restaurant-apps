/* eslint-disable no-undef */
Feature('HomePage');

Before(({ I }) => {
  I.amOnPage('/#/');
});

Scenario('check if app shell showing', ({ I }) => {
  I.seeElement('app-bar');
  I.seeElement('#root');
  I.seeElement('custom-footer');
});
