import 'regenerator-runtime'; /* for async await transpile */

import '../styles/main.css';
import '../styles/app-bar.css';
import '../styles/custom-footer.css';
import '../styles/card-list.css';
import '../styles/hero-card.css';
import '../styles/image-card.css';
import '../styles/description-item.css';
import '../styles/custom-menu.css';
import '../styles/customer-review.css';
import '../styles/loading-indicator.css';
import '../styles/error-message.css';
import '../styles/fab-like-button.css';

import App from './views/App';
import swRegister from './utils/sw-register';

window.addEventListener('load', () => {
  App.init();
  swRegister();
});

window.addEventListener('hashchange', () => {
  // re-render page
  App.renderPage();
});
