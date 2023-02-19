import { appendBody, createElement, rootPageElementId } from './DomHelper';

export const isOnMobileMode = () => {
  const viewport = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  return viewport <= 768;
};

export const setTitleApp = (newTitle = '') => {
  document.title = newTitle;
};

export const setDescriptionApp = (newDescription = '') => {
  document.querySelector('meta[name="description"]').setAttribute('content', newDescription);
};

export const getAppName = () => document.querySelector('meta[name="my-app-name"]').getAttribute('content');

export const setAppName = (newName = '') => {
  document.querySelector('meta[name="my-app-name"]').setAttribute('content', newName);
};

export const putMetaTag = (name = '', content = '') => {
  if (document.querySelector(`meta[name='${name}']`)) {
    document.querySelector(`meta[name='${name}']`).setAttribute(name, content);
    return;
  }

  const newMetaTag = document.createElement('meta');
  newMetaTag.setAttribute('name', name);
  newMetaTag.setAttribute('content', content);

  if (document.querySelector('meta[name="description"]')) {
    document.querySelector('meta[name="description"]').after(newMetaTag);
  } else {
    document.head.appendChild(newMetaTag);
  }
};

export const initApp = ({
  name = '', initialTitle = '', description = '', header = null, footer = null, skipToContentRef = `#${rootPageElementId}`,
}) => {
  setAppName(name);
  setTitleApp(initialTitle);
  setDescriptionApp(description);

  // create skip to content cta
  const skipToContentActionElem = createElement({
    tagName: 'a',
    classNames: 'skip-to-content-cta',
    innerText: 'Skip to content',
    data: {
      tabIndex: '0',
    },
  });
  const actionCallback = (e) => {
    if (e.type === 'click' || (e.key === 'Enter' || e.keyCode === 13)) {
      const refElem = document.querySelector(skipToContentRef);
      if (refElem) {
        skipToContentActionElem.blur();
        refElem.focus();
        refElem.scrollIntoView();
      }
    }
  };
  skipToContentActionElem.addEventListener('click', actionCallback);
  skipToContentActionElem.addEventListener('keypress', actionCallback);
  appendBody(skipToContentActionElem);

  if (header != null) {
    appendBody(header);
  }

  appendBody(
    createElement({
      tagName: 'main',
      id: rootPageElementId,
    }),
  );

  if (footer != null) {
    appendBody(footer);
  }
};
