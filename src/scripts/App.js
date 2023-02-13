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
      if (isOpen) {
        getElem('body').classList.add(bodyDrawerOpenModeClassName);
        getElem('.nav-menu').classList.add(navMenuOpenClassName);
      } else {
        getElem('body').classList.remove(bodyDrawerOpenModeClassName);
        getElem('.nav-menu').classList.remove(navMenuOpenClassName);
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
      })
    });

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