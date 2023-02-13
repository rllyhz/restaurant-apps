import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/app-bar.css';
import '../styles/custom-footer.css';
import App from './App';

document.addEventListener('DOMContentLoaded', _ => {
  App.renderPage();
});

document.addEventListener('hashchange', _ => {
  App.renderPage();
});
