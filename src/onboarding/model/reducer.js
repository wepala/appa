import {ONBOARD} from './commandTypes';

const onboard = (state = {onBoarded: false}, action) => {
  switch (action.type) {
    case ONBOARD:
      return {...state, onBoarded: action.payload};
    default:
      return state;
  }
};

export default onboard;
