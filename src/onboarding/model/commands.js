import {ONBOARD} from './commandTypes';

export const onBoardUser = (onBoard) => {
  return {
    type: ONBOARD,
    payload: onBoard,
  };
};
