import {useState} from 'react';

export const useForm = initValues => {
  const [values, setvalues] = useState(initValues);

  return [
    values,
    (val, key) => {
      console.log('Value changing,', val, key);
      setvalues({...values, [key]: val});
    },
  ];
};

export const useValidated = (form, validated) => {
  const [valid, setValid] = useState(validated);

  return [
    valid,
    (data, currentValid) => {
      console.log('Submitted', form.title, form.timeEstimate);
      if (form.title === '') {
        currentValid.title = false;
      } else {
        currentValid.title = true;
      }
      if (
        form.timeEstimate === '' ||
        form.timeEstimate === '0' ||
        form.timeEstimate === undefined
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
