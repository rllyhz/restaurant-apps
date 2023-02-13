export class Observable {
  constructor({ observeAtFirstLaunch = false, initialValue = null }) {
    this.value = initialValue;
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

    return this;
  }

  emit(newValue) {
    this.value = newValue;
    this.observers.forEach(obsvr => obsvr(newValue));
    return this;
  }
}

export const observableOf = (value) => new Observable({initialValue: value, observeAtFirstLaunch: true});