/* eslint-disable no-undef */
import { toPath, toPublicPath } from '../../src/scripts/helpers/RouteHelper';

describe('RouteHelper', () => {
  it('should parse the path into hash correctly when specific path provided', () => {
    let expectedPath = '/#/home';
    let result = toPath('/home');
    expect(result).toEqual(expectedPath);

    expectedPath = '/#/detail';
    result = toPath('detail/');
    expect(result).toEqual(expectedPath);

    expectedPath = '/#/detail/2';
    result = toPath('/detail/2');
    expect(result).toEqual(expectedPath);
  });

  it('should generate the public path when specific path provided', () => {
    let expectedPublicPath = '/images/animal.jpg';
    let result = toPublicPath('/images/animal.jpg');
    expect(result).toEqual(expectedPublicPath);

    expectedPublicPath = '/js/sw.js';
    result = toPublicPath('js/sw.js');
    expect(result).toEqual(expectedPublicPath);
  });
});
