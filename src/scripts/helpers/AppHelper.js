import { appendBody, createElement, rootPageElementId } from './DomHelper';

export const isOnMobileMode = () => {
  const viewport = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  return viewport <= 768;
};

export const setTitleApp = (newTitle) => {
  document.title = newTitle;
};

export const initApp = ({
  title = '', header = null, footer = null, skipToContentRef = `#${rootPageElementId}`,
}) => {
  setTitleApp(title);

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
