import { appendBody, createElement, getElem } from "./DomHelper";

export const rootPageElementId = 'root';
export const getRootPage = () => getElem(`#${rootPageElementId}`);

export const initApp = ({title = '', header = null, footer = null}) => {
  setTitleApp(title);

  if (header != null) {
    appendBody(header);
  }

  appendBody(
    createElement({
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