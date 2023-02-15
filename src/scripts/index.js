import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/app-bar.css';
import '../styles/custom-footer.css';
import App from './views/App';

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

window.onhashchange = () => {
  // re-render page
  App.renderPage();
};
