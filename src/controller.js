export class Controller {
  state;
  dispatch;

  configureDispatch(dispatch) {
    this.dispatch = dispatch;
    let result = {
      dispatch: dispatch,
    };
    let proto = Object.getPrototypeOf(this);
    while (proto) {
      Object.getOwnPropertyNames(proto).forEach(name => {
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
            result[name] = (...args) => {
              this[name].apply(result, args);
            };
          }
        }
      });
      proto = Object.getPrototypeOf(proto);
    }
    return {...result};
  }

  configureState(state) {
    this.state = state;
    const result = {};
    let proto = Object.getPrototypeOf(this);
    while (proto) {
      Object.getOwnPropertyNames(proto).forEach(name => {
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
            result[name] = this[name];
          }
        }
      });
      proto = Object.getPrototypeOf(proto);
    }
    return {...result};
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
