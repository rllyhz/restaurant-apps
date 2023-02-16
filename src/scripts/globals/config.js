const CONFIG = {
  BASE_URL: 'https://restaurant-api.dicoding.dev/',
  BASE_IMAGE_MEDIUM: 'https://restaurant-api.dicoding.dev/images/medium/',
  BASE_IMAGE_LARGE: 'https://restaurant-api.dicoding.dev/images/large/',
  CACHE_NAME: 'RecommendationRestaurantApp-V1',
};

const StringResource = {
  errorTitleText: 'Opsss... Something went wrong',
  errorConnectionDescriptionText: 'It seemed like you\'re currently offline. Please check your connection and try again later.',
  errorRequestAPIDescriptionText: 'It seemed like you\'re your request were missing somehow. Please try again later.',
  errorInternalDescriptionText: 'It seemed like the internal error occurred. Please try again later.',
  emptyDataTitleText: (categoryName) => `${categoryName} are still empty`,
  emptyDataDescriptionText: 'Try add some to place here',
  errorBtnRetryText: 'Refresh',
};

export { CONFIG, StringResource };
