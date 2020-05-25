import {createTransform} from 'redux-persist';

export const mapTransformer = createTransform(
  (inboundState) => {
    return {
      ...inboundState,
      getById: JSON.stringify(Array.from(inboundState.getById)),
      getByTime: JSON.stringify(Array.from(inboundState.getByTime)),
      getByTaskId: JSON.stringify(Array.from(inboundState.getByTaskId)),
    };
  },
  (outboundState) => {
    return {
      ...outboundState,
      getById: new Map(JSON.parse(outboundState.getById)),
      getByTime: new Map(JSON.parse(outboundState.getByTime)),
      getByTaskId: new Map(JSON.parse(outboundState.getByTaskId)),
    };
  },
  {whitelist: ['logs']},
);
