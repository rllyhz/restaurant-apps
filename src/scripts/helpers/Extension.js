export class Observable {
  constructor({ observeAtFirstLaunch = false, initialValue = null }) {
    this.currentValue = initialValue;
    this.observeAtFirstLaunch = observeAtFirstLaunch;
    this.observers = [];
  }

  observe(observer) {
    if (typeof observer !== 'function') {
      console.error('Observer must be a function');
      return;
    }

    this.observers.push(observer);

    if (this.observeAtFirstLaunch) {
      this.observers[this.observers.length - 1](this.value);
    }
  }

  emit(newValue) {
    this.currentValue = newValue;
    this.observers.forEach((obsvr) => obsvr(newValue));
    return this;
  }
}

export const observableOf = (value) => new Observable({
  initialValue: value, observeAtFirstLaunch: false,
});
