export default class Restaurant {
  constructor(
    id,
    name,
    description,
    imageSrc,
    city,
    rating,
    address = null,
    customerReviews = [],
    menus = {},
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageSrc = imageSrc;
    this.city = city;
    this.rating = rating;
    this.address = address;
    this.customerReviews = customerReviews;
    this.menus = menus;
  }
}
