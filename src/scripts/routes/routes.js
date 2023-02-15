import { Router } from '../helpers/RouteHelper';
import HomePage from '../views/pages/HomePage';

export default Router.build()
  .add(HomePage.path, HomePage);
