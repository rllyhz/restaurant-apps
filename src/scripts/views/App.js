import 'regenerator-runtime'; /* for async await transpile */
import { Router } from '../helpers/RouteHelper';
import { StringResource } from '../globals/config';
import { createElement, getElem, getRootPage } from '../helpers/DomHelper';
import { EventType, broadcastEvent } from '../helpers/EventHelper';
import { initApp, isOnMobileMode } from '../helpers/AppHelper';

import AppBar from '../components/AppBar';
import CustomFooter from '../components/CustomFooter';
import routes from '../routes/routes';

export default class App {
  static async init() {
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

    // init app shell
    initApp({
      name: 'Restaurants Recommendation WebApp',
      initialTitle: StringResource.title('Home'),
      description: StringResource.description('Restaurants recommendation'),
      header: createElement({
        tagName: AppBar.tagName,
        data: {
          callbacks: {
            toggleDrawerCallback: () => {
              isDrawerOpen = !isDrawerOpen;
              broadcastEvent(
                EventType.drawerMode,
                document.body,
                { isOpen: isDrawerOpen },
              );
            },
            onMenuItemClickedCallback: (url) => {
              if (document.body.classList.contains(bodyDrawerOpenModeClassName)) {
                isDrawerOpen = !isDrawerOpen;
                broadcastEvent(
                  EventType.drawerMode,
                  document.body,
                  { isOpen: isDrawerOpen },
                );
              }

              Router.href(url);
            },
          },
        },
      }),
      footer: createElement({
        tagName: CustomFooter.tagName,
      }),
      skipToContentRef: '#skip-to-content',
    });

    // when the app runs on mobile device (drawer mode enables)
    // set all the anchor menu to not accessible at first place
    if (isOnMobileMode()) {
      broadcastEvent(
        EventType.drawerMode,
        document.body,
        { isOpen: false },
      );
    }

    App.renderPage();
  }

  static async renderPage() {
    const { data, activePath } = Router.getExpectedRoute();
    const activePage = routes[activePath];

    document.querySelector('app-bar').setActiveMenu(activePath);

    getRootPage().innerHTML = ''; // clear page container
    document.querySelector('app-bar').scrollIntoView();
    await activePage.render(data);
  }

  static updateAppShell() {
    const activePath = Router.getActivePath();
    document.querySelector('app-bar').setActiveMenu(activePath);
  }
}
