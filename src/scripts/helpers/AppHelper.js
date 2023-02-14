import { appendBody, createElement, getElem } from "./DomHelper";

export const rootPageElementId = 'root';
export const getRootPage = () => getElem(`#${rootPageElementId}`);

export const initApp = ({title = '', header = null, footer = null, skipToContentRef = `#${rootPageElementId}`}) => {
  setTitleApp(title);

  const skipToContentActionElem = createElement({
    tagName: 'a',
    classNames: 'skip-to-content-action',
    innerText: 'Skip to content'
  });
  skipToContentActionElem.href = skipToContentRef;
  appendBody(skipToContentActionElem);

  if (header != null) {
    appendBody(header);
  }

  appendBody(
    createElement({
      tagName: 'main',
      id: rootPageElementId
    })
  );

  if (footer != null) {
    appendBody(footer);
  }
};

export const setTitleApp = (newTitle) => {
  document.title = newTitle;
};