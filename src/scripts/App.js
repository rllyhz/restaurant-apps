import 'regenerator-runtime'; /* for async await transpile */
import routes from './routes/routes';
import { Router } from './helpers/RouteHelper';
import { createElement, getElem } from './helpers/DomHelper';
import { initApp, getRootPage } from './helpers/AppHelper';
import { observableOf } from './helpers/Extension';

import AppBar from './components/AppBar';
import CustomFooter from './components/CustomFooter';
import HomePage from './pages/HomePage';

export default class App {
  static async renderPage() {
    const bodyDrawerOpenModeClassName = 'drawer-open-mode';
    const navMenuOpenClassName = 'open';

    const isDrawerOpenObservable = observableOf(false);

    isDrawerOpenObservable.observe(isOpen => {
      const menuItems = getElem('.nav-menu').children[0].children
      if (isOpen) {
        getElem('body').classList.add(bodyDrawerOpenModeClassName);
        getElem('.nav-menu').classList.add(navMenuOpenClassName);
        // make all the anchor menu accesible in tab order
        for (let index = 0; index < menuItems.length; index++) {
          menuItems[index].children[0].setAttribute('tabIndex', '0');
        }
      } else {
        getElem('body').classList.remove(bodyDrawerOpenModeClassName);
        getElem('.nav-menu').classList.remove(navMenuOpenClassName);
        // make all the anchor menu not accesible in tab order
        for (let index = 0; index < menuItems.length; index++) {
          menuItems[index].children[0].setAttribute('tabIndex', '-1');
        }
      }
    });

    // init app
    initApp({
      title: 'Restaurant App | Rully Ihza Mahendra',
      header: createElement({
        tagName: AppBar.tagName,
        data: {
          toggleDrawerCallback: () => {
            let currentValue = isDrawerOpenObservable.currentValue;
            isDrawerOpenObservable.emit(!currentValue);
          }
        }
      }),
      footer: createElement({
        tagName: CustomFooter.tagName
      }),
      skipToContentRef: '#recommendation'
    });

    // when the app runs on mobile device (drawer mode enables)
    // set all the anchor menu to not accessible at first place
    const viewport = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    if (viewport <= 768) {
      isDrawerOpenObservable.emit(false);
    }

    Router.addOnPreReloadCallback(() => {
      getRootPage().innerHTML = '';
    });

    Router.addOnReloadCallback(async (currentPath, data) => {
      const activePage = routes.getActivePage(currentPath);
      await activePage.render(data)
    });

    Router.load({ initialPath: HomePage.path });
  }
}