import {useState} from 'react';

export const useForm = initValues => {
  const [values, setvalues] = useState(initValues);

  return [
    values,
    (val, key) => {
      console.log(val, key);
      setvalues({...values, [key]: val});
    },
  ];
};
