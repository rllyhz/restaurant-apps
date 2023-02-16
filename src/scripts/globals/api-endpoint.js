import { CONFIG } from './config';

const API_ENDPOINT = {
  GET_RESTAURANTS: `${CONFIG.BASE_URL}list`,
  DETAIL_RESTAURANT: (id) => `${CONFIG.BASE_URL}detail/${id}`,
  ADD_NEW_REVIEW: `${CONFIG.BASE_URL}review`,
};

export default API_ENDPOINT;
