import {connect} from 'react-redux';

export const Component = (controller, view) => {
  return connect(
    state => controller.configureState(state),
    dispatch => controller.configureDispatch(dispatch),
  )(view);
};
