import {
  appendBody,
  appendPage,
  createElement,
  getElem,
} from '../../src/scripts/helpers/DomHelper';
import { setContentBody } from '../utils/testFactories';

describe('DomHelper', () => {
  it('should create new element', () => {
    const expectedTagName = 'H1';
    const expectedId = 'elem-id';
    const expectedClassName = 'elem-class-name';
    const expectedInnerText = 'Testing Element';
    const expectedDatasetValue = 'elem-data-value';
    const expectedData = {
      firstName: 'John',
      lastName: 'Doe',
    };

    const createdElem = createElement({
      tagName: expectedTagName,
      id: expectedId,
      classNames: expectedClassName,
      dataset: {
        key: expectedDatasetValue,
      },
      data: {
        elemData: expectedData,
      },
      innerText: expectedInnerText,
    });

    expect(createdElem.tagName).toEqual(expectedTagName);
    expect(createdElem.id).toEqual(expectedId);
    expect(createdElem.classList.contains(expectedClassName)).toBeTrue();
    expect(createdElem.dataset.key).toEqual(expectedDatasetValue);
    expect(createdElem.elemData).toEqual(expectedData);
  });

  it('should return the expected element', () => {
    const expectedClassName = 'testing';

    const dummyElem = document.createElement('a');
    dummyElem.classList.add(expectedClassName);

    setContentBody(dummyElem);

    const result = getElem('a.testing');

    expect(result).toBeTruthy();
    expect(result.classList.contains(expectedClassName))
      .toBeTrue();
  });

  it('should add new child to the body page', () => {
    document.body.innerHTML = '';
    const expectedTagName = 'H1';
    const dummyElem = document.createElement(expectedTagName);

    expect(document.body.children.length)
      .toBeLessThanOrEqual(0);

    appendBody(dummyElem);

    expect(document.body.children.length)
      .toBeGreaterThan(0);
    expect(document.body.children[0].tagName)
      .toEqual(expectedTagName);

    document.body.innerHTML = '';
  });

  it('should add content elem into main page', () => {
    document.body.innerHTML = '';
    const dummyElem = document.createElement('H1');

    const rootPageElem = document.createElement('main');
    rootPageElem.id = 'root';
    document.body.appendChild(rootPageElem);

    expect(document.querySelector('#root').children.length)
      .toBeLessThanOrEqual(0);

    appendPage(dummyElem);

    expect(document.querySelector('#root').children.length)
      .toBeGreaterThan(0);

    document.body.innerHTML = '';
  });
});
