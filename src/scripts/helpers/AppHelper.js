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

  const skipToContentActionElem = createElement({
    tagName: 'a',
    classNames: 'skip-to-content-action',
    innerText: 'Skip to content',
  });
  skipToContentActionElem.href = skipToContentRef;
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
