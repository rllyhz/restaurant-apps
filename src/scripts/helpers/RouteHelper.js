const pages = {};
const history = [];
let reloadCallback = null;
let preReloadCallback = null;

const _routes = {
  add(path, page) {
    pages[path] = page;
    return this;
  },
  getActivePage(path) {
    return pages[path];
  },
};

class Router {
  static build() {
    return _routes;
  }

  static async addOnPreReloadCallback(newCallback) {
    preReloadCallback = newCallback;
  }

  static async addOnReloadCallback(newCallback) {
    reloadCallback = newCallback;
  }

  static load({ initialPath }, data = null) {
    if (history.length <= 0) {
      history.push(initialPath);
    }

    if (preReloadCallback != null && typeof preReloadCallback === 'function') {
      preReloadCallback();
    }

    if (reloadCallback != null && typeof reloadCallback === 'function') {
      reloadCallback(history[0], data);
    }
  }

  static navigateTo(path, data = null) {
    history.unshift(path);

    if (preReloadCallback != null && typeof preReloadCallback === 'function') {
      preReloadCallback();
    }

    if (reloadCallback != null && typeof reloadCallback === 'function') {
      reloadCallback(history[0], data);
    }
  }

  static navigateUp() {
    if (history.length <= 1) {
      return;
    }

    history.shift();

    if (preReloadCallback != null && typeof preReloadCallback === 'function') {
      preReloadCallback();
    }

    if (reloadCallback != null && typeof reloadCallback === 'function') {
      reloadCallback(history[0], null);
    }
  }
}

export default Router;
