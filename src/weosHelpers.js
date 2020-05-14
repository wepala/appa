import {useState} from 'react';
import {connect} from 'react-redux';

export const Component = (controller, view, props = {}) => {
  return connect(
    state => controller.configureState(state, props),
    dispatch => controller.configureDispatch(dispatch),
  )(view);
};

// Form Hooks

// Handles setting of form data
export const useForm = initValues => {
  const [values, setvalues] = useState(initValues);

  return [
    values,
    (val, key) => {
      console.log('Value changing,', val, key);
      setvalues({...values, [key]: val});
      console.log(values);
    },
  ];
};
// Handles validation of fields belonging to form data
export const useValidated = (form, validated) => {
  const [valid, setValid] = useState(validated);

  return [
    valid,
    (data, currentValid) => {
      if (data.title === '') {
        currentValid.title = false;
      } else {
        currentValid.title = true;
      }
      if (
        data.timeEstimate === '' ||
        data.timeEstimate === '0' ||
        data.timeEstimate === undefined
      ) {
        currentValid.timeEstimate = false;
      } else {
        currentValid.timeEstimate = true;
      }
      setValid({...valid, ...currentValid});
    },
    () => {
      setValid({...valid, title: true, timeEstimate: true});
    },
  ];
};
