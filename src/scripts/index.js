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

import App from './views/App';

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

window.onhashchange = () => {
  // re-render page
  App.renderPage();
};
