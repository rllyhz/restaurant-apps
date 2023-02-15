import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/app-bar.css';
import '../styles/custom-footer.css';
import App from './App';

document.addEventListener('DOMContentLoaded', () => {
  App.renderPage();
});

document.addEventListener('hashchange', () => {
  App.renderPage();
});
