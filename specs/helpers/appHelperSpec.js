/* eslint-disable no-undef */
import { createAppBar, createFooter } from '../utils/testFactories';
import {
  initApp,
  putMetaTag,
  setDescriptionApp,
  setTitleApp,
} from '../../src/scripts/helpers/AppHelper';
import AppBar from '../../src/scripts/components/AppBar';
import CustomFooter from '../../src/scripts/components/CustomFooter';

describe('AppHelper', () => {
  it('should render app shell', () => {
    const header = createAppBar();
    const footer = createFooter();

    document.head.innerHTML = `
      <meta name='my-app-name' content='Testing App'>
      <meta name='description' content='Desription of Testing App'>
    `;

    initApp({ header, footer });

    const renderedAppBar = document.querySelector(AppBar.tagName);
    const renderedFooter = document.querySelector(CustomFooter.tagName);
    document.body.innerHTML = '';

    expect(renderedAppBar).toBeTruthy();
    expect(renderedFooter).toBeTruthy();
  });

  it('should update the title page', () => {
    const expectedTitle = 'Title Testing App';

    setTitleApp(expectedTitle);
    const resultTitle = document.title;

    expect(resultTitle).toEqual(expectedTitle);
  });

  it('should update the description page', () => {
    const expectedDescription = 'Description Testing App';

    const newMetaTag = document.createElement('meta');
    newMetaTag.setAttribute('name', 'description');
    newMetaTag.setAttribute('content', '');
    document.head.appendChild(newMetaTag);

    setDescriptionApp(expectedDescription);
    const resultDescription = document.querySelector('meta[name="description"]').getAttribute('content');
    document.head.innerHTML = '';

    expect(resultDescription).toEqual(expectedDescription);
  });

  it('should add meta tag into page', () => {
    const expectedName = 'new-meta-data';
    const expectedContent = 'new meta data value';

    putMetaTag(expectedName, expectedContent);
    const resultContent = document.querySelector(`meta[name='${expectedName}']`).getAttribute('content');
    document.head.innerHTML = '';

    expect(resultContent).toEqual(expectedContent);
  });
});
