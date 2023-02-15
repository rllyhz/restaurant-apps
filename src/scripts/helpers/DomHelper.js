export const getElem = (cssSelector) => document.querySelector(cssSelector);

export const rootPageElementId = 'root';
export const getRootPage = () => getElem(`#${rootPageElementId}`);

export const appendBody = (newNode) => {
  document.body.appendChild(newNode);
};

export const appendPage = (newNode) => {
  getRootPage().appendChild(newNode);
};

export const createElement = ({
  tagName = 'div', id = '', classNames = '',
  dataset = {}, data = {}, styles = {},
  innerText = '',
}) => {
  const newElement = document.createElement(tagName);

  if (classNames.length > 0) newElement.classList.add(classNames);
  if (id.length > 0) newElement.id = id;

  if (typeof dataset === 'object' && Object.entries(dataset).length > 0) {
    Object.entries(dataset).forEach((keyValue) => {
      const [key, value] = keyValue;
      newElement.dataset[key] = value;
    });
  }

  if (typeof styles === 'object' && Object.entries(styles).length > 0) {
    Object.entries(styles).forEach((keyValue) => {
      const [key, value] = keyValue;
      newElement.style[key] = value;
    });
  }

  if (typeof data === 'object' && Object.entries(data).length > 0) {
    Object.entries(data).forEach((keyValue) => {
      const [key, value] = keyValue;
      newElement[key] = value;
    });
  }

  if (innerText.length > 0) {
    newElement.innerText = innerText;
  }

  return newElement;
};
