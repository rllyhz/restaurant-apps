import 'regenerator-runtime'; /* for async await transpile */
import routes from './routes/routes';
import { Router } from './helpers/RouteHelper';
import { createElement } from './helpers/DomHelper';
import { initApp, getRootPage } from './helpers/AppHelper';

import AppBar from './components/AppBar';
import CustomFooter from './components/CustomFooter';
import HomePage from './pages/HomePage';

export default class App {
  static async renderPage() {
    // init app
    initApp({
      title: 'Restaurant App | Rully Ihza Mahendra',
      header: createElement({
        tagName: AppBar.tagName
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