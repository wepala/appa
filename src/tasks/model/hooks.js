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
      console.log('Submitted', form);
      if (!form.title || form.title == '' || form.title === null) {
        currentValid.title = false;
      } else {
        currentValid.title = true;
      }
      setValid({...valid, ...currentValid});
    },
  ];
};
