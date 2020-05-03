import {Controller} from '../controller';

describe('controller', () => {
  class TestController extends Controller {
    test = 'adsf';

    get bar() {
      return this.state.foo;
    }
    onComplete() {
      this.dispatch();
    }
  }

  it('should convert properties on the controller to a props object', () => {
    const controller = new TestController();
    const props = controller.configureState({foo: 'bar'});
    expect(props.bar).toBe('bar');
  });

  it('should convert function to handlers accessible via the view', () => {
    const dispatch = jest.fn();
    const controller = new TestController();
    const handlers = controller.configureDispatch(dispatch);
    expect(handlers.foo).toBeUndefined();
    expect(handlers.onComplete).toBeDefined();
    handlers.onComplete();
    expect(dispatch).toBeCalled();
  });
});
