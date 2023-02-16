export default class CustomerReview extends HTMLElement {
  static tagName = 'customer-review';

  set detail({ reviews, onAddReviewCallback }) {
    this._reviews = reviews;
    this._addReviewCallback = (e) => {
      const textarea = e.target.previousElementSibling;
      const review = textarea.value;
      if (review.length > 1) onAddReviewCallback(review);
    };
    this._render();
  }

  connectedCallback() {
    this.querySelector('.full-reviews .give-review button').addEventListener('click', this._addReviewCallback);
  }

  disconnectedCallback() {
    this.querySelector('.full-reviews .give-review button').removeEventListener('click', this._addReviewCallback);
  }

  _render() {
    this.innerHTML = `
      <div class='full-reviews'>
        <p class='title'>Customer Reviews</p>
        <div class='reviews-container'></div>
        <div class='give-review'>
          <textarea></textarea>
          <button>Review</button>
        </div>
      </div>
    `;

    this._reviews.forEach((item) => {
      const { name, review, date } = item;
      this.addReview(name, review, date);
    });
  }

  addReview(name, review, date) {
    const reviewElem = document.createElement('div');
    reviewElem.innerHTML = `
      <div class='review'>
        <p>${date} - <b>${name}</b></p>
        <p><i>"${review}"</i></p>
      </div>
    `;
    this.querySelector('.full-reviews .reviews-container').appendChild(reviewElem);
  }

  resetInput() {
    this.querySelector('.full-reviews .give-review button').removeAttribute('disabled');
    this.querySelector('.full-reviews .give-review textarea').value = '';
  }

  loadingUI() {
    this.querySelector('.full-reviews .give-review button').setAttribute('disabled', '');
  }

  errorUI() {
    this.querySelector('.full-reviews .give-review button').removeAttribute('disabled');
  }
}

customElements.define(CustomerReview.tagName, CustomerReview);
