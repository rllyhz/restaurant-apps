const history = [];
let _data = null;

const _sanitizePath = (path = '') => {
  const chars = Array.from(path);

  if (chars[0] === '/') chars.shift();
  if (chars[chars.length - 1] === '/') chars.pop();

  return chars.join('');
};

const toPath = (path = '/') => `#/${_sanitizePath(path)}`;
const toPublicPath = (path = '/') => `/${_sanitizePath(path)}`;

const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    const splitedUrl = this._urlSplitter(url);
    return this._urlCombiner(splitedUrl);
  },

  parseActiveUrlWithoutCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    return this._urlSplitter(url);
  },

  _urlSplitter(url) {
    const urlsSplits = url.split('/');
    return {
      resource: urlsSplits[1] || null,
      id: urlsSplits[2] || null,
      verb: urlsSplits[3] || null,
    };
  },

  _urlCombiner(splitedUrl) {
    return (splitedUrl.resource ? `/${splitedUrl.resource}` : '/')
    + (splitedUrl.id ? '/:id' : '')
    + (splitedUrl.verb ? `/${splitedUrl.verb}` : '');
  },
};

const Router = {
  getPathData() {
    return _data;
  },

  getActivePath() {
    return UrlParser.parseActiveUrlWithCombiner();
  },

  getId() {
    return UrlParser.parseActiveUrlWithoutCombiner().id;
  },

  getExpectedRoute() {
    const data = this.getPathData();
    const activePath = this.getActivePath();

    return { data, activePath };
  },

  load({ initialPath }, data = null) {
    if (history.length <= 0) {
      history.push(initialPath);
    }

    _data = data;
    location.href = initialPath;
  },

  navigateTo(path, data = null) {
    history.unshift(path);
    _data = data;
    location.href = path;
  },

  navigateUp() {
    const path = history.shift();
    location.hash = path;
  },

  href(url = '/') {
    location.href = url;
  },

  path() {
    return location.hash;
  },
};

export {
  Router, toPath, toPublicPath,
};
