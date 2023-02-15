import HomePage from '../views/pages/HomePage';
import DetailPage from '../views/pages/DetailPage';
import FavoritePage from '../views/pages/FavoritePage';

const routes = {
  '/': HomePage,
  '/detail:id': DetailPage,
  '/favorite': FavoritePage,
};

export default routes;
