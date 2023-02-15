import Router from '../helpers/RouteHelper';
import HomePage from '../pages/HomePage';

export default Router.build()
  .add(HomePage.path, HomePage);
