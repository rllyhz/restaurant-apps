import 'regenerator-runtime'; /* for async await transpile */
import routes from './routes/routes';
import { Router } from './helpers/RouteHelper';
import { createElement, getElem, getRootPage } from './helpers/DomHelper';
import { EventType, broadcastEvent } from './helpers/EventHelper';
import { initApp } from './helpers/AppHelper';

import AppBar from './components/AppBar';
import CustomFooter from './components/CustomFooter';
import HomePage from './pages/HomePage';

export default class App {
  static async renderPage() {
    const bodyDrawerOpenModeClassName = 'drawer-open-mode';
    const navMenuOpenClassName = 'open';
    let isDrawerOpen = false;

    document.body.addEventListener(EventType.drawerMode, (evt) => {
      const menuItems = getElem('.nav-menu').children[0].children;
      const { isOpen } = evt.detail;

      if (isOpen) {
        getElem('body').classList.add(bodyDrawerOpenModeClassName);
        getElem('.nav-menu').classList.add(navMenuOpenClassName);
        // make all the anchor menu accesible in tab order
        for (let index = 0; index < menuItems.length; index += 1) {
          menuItems[index].children[0].setAttribute('tabIndex', '0');
        }
      } else {
        getElem('body').classList.remove(bodyDrawerOpenModeClassName);
        getElem('.nav-menu').classList.remove(navMenuOpenClassName);
        // make all the anchor menu not accesible in tab order
        for (let index = 0; index < menuItems.length; index += 1) {
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
            isDrawerOpen = !isDrawerOpen;
            broadcastEvent(
              EventType.drawerMode,
              document.body,
              { isOpen: isDrawerOpen },
            );
          },
        },
      }),
      footer: createElement({
        tagName: CustomFooter.tagName,
      }),
      skipToContentRef: '#recommendation',
    });

    // when the app runs on mobile device (drawer mode enables)
    // set all the anchor menu to not accessible at first place
    const viewport = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    if (viewport <= 768) {
      broadcastEvent(
        EventType.drawerMode,
        document.body,
        { isOpen: false },
      );
    }

    Router.addOnPreReloadCallback(() => {
      getRootPage().innerHTML = '';
    });

    Router.addOnReloadCallback(async (currentPath, data) => {
      const activePage = routes.getActivePage(currentPath);
      await activePage.render(data);
    });

    Router.load({ initialPath: HomePage.path });
  }
}
