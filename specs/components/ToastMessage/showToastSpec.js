/* eslint-disable no-undef */
import { createToastMessage } from '../../utils/testFactories';

describe('ShowToast', () => {
  it('should show', () => {
    const message = 'Toast message for testing';
    const toast = createToastMessage({ message });

    expect(document.querySelector('toast-message'))
      .toBeTruthy();
    expect(document.querySelector('toast-message.show'))
      .toBeFalsy();

    toast.show();

    const showingToastElem = document.querySelector('toast-message.show');

    expect(showingToastElem).toBeTruthy();
    expect(showingToastElem.innerText).toEqual(message);
  });

  it('should be able to change backgroundColor and text color', () => {
    const message = 'Toast message for testing';
    const expectedBackgroundColor = 'teal';
    const expectedColor = 'white';

    createToastMessage({ message, backgroundColor: expectedBackgroundColor, color: expectedColor })
      .show();

    const showingToastElem = document.querySelector('toast-message.show');

    expect(showingToastElem).toBeTruthy();
    expect(showingToastElem.style.backgroundColor).toEqual(expectedBackgroundColor);
    expect(showingToastElem.style.color).toEqual(expectedColor);
  });
});
