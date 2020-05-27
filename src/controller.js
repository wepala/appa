export class Controller {
  state;
  dispatch;
  #result = {};

  configureDispatch(dispatch) {
    this.dispatch = dispatch;
    let proto = Object.getPrototypeOf(this);
    while (proto) {
      Object.getOwnPropertyNames(proto).forEach((name) => {
        if (
          name !== 'constructor' &&
          name !== 'configureState' &&
          name !== 'configureDispatch' &&
          name !== 'convertToHandlers' &&
          name !== 'convertToProps' &&
          name !== 'hasMethod' &&
          name !== 'hasGetter' &&
          name !== '__defineGetter__' &&
          name !== '__defineSetter__' &&
          name !== 'hasOwnProperty' &&
          name !== '__lookupGetter__' &&
          name !== '__lookupSetter__' &&
          name !== 'isPrototypeOf' &&
          name !== 'propertyIsEnumerable' &&
          name !== 'toString' &&
          name !== 'valueOf' &&
          name !== 'toLocaleString'
        ) {
          if (this.hasMethod(proto, name)) {
            this.#result[name] = (...args) => {
              return this[name].apply(this, args);
            };
          }
        }
      });
      proto = Object.getPrototypeOf(proto);
    }
    return {...this.#result};
  }

  configureState(state) {
    this.state = state;
    let proto = Object.getPrototypeOf(this);
    while (proto) {
      Object.getOwnPropertyNames(proto).forEach((name) => {
        if (
          name !== 'constructor' &&
          name !== 'configureState' &&
          name !== 'configureDispatch' &&
          name !== 'convertToHandlers' &&
          name !== 'convertToProps' &&
          name !== 'hasMethod' &&
          name !== 'hasGetter' &&
          name !== '__defineGetter__' &&
          name !== '__defineSetter__' &&
          name !== 'hasOwnProperty' &&
          name !== '__lookupGetter__' &&
          name !== '__lookupSetter__' &&
          name !== 'isPrototypeOf' &&
          name !== 'propertyIsEnumerable' &&
          name !== 'toString' &&
          name !== 'valueOf' &&
          name !== 'toLocaleString'
        ) {
          if (this.hasGetter(proto, name)) {
            this.#result[name] = this[name];
          }
        }
      });
      proto = Object.getPrototypeOf(proto);
    }
    return {...this.#result};
  }

  hasMethod(obj, name) {
    const desc = Object.getOwnPropertyDescriptor(obj, name);
    return !!desc && typeof desc.value === 'function';
  }

  hasGetter(obj, name) {
    const desc = Object.getOwnPropertyDescriptor(obj, name);
    return !!desc && typeof desc.get === 'function';
  }
}
