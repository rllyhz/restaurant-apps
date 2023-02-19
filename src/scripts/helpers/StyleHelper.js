export const getPropertyValueOf = (node, propertyName) => getComputedStyle(node)
  .getPropertyValue(propertyName);

export const getAppBarHeight = () => getPropertyValueOf(document.body, '--app-bar-height');

export const convertRemToPixels = (rem = '1rem') => parseFloat(rem) * parseFloat(getComputedStyle(document.documentElement).fontSize);

export const addRemValue = (first = '0rem', second = '0rem') => `${parseFloat(first) + parseFloat(second)}rem`;
