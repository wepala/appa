import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {default as brandTheme} from './theme.json';

import HomeScreen from './src/views/HomeScreen';
import {Provider} from 'react-redux';

//store
import store from './src/store';

export default () => {
  const {light, dark, mapping} = eva;
  const [theme, setTheme] = useState(light);

  const toggleTheme = checked => {
    const nextTheme = checked ? dark : light;
    setTheme(nextTheme);
  };
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={{...theme, ...brandTheme}}>
        <Provider store={store}>
          <HomeScreen toggleTheme={toggleTheme} currentTheme={theme === dark} />
        </Provider>
      </ApplicationProvider>
    </>
  );
};
