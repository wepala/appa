import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {default as brandTheme} from './theme.json';
import {ThemeContext} from './theme.context';

import HomeScreen from './src/views/HomeScreen';
import {Provider} from 'react-redux';

//store
import store from './src/store';

export default () => {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <ApplicationProvider {...eva} theme={{...eva[theme], ...brandTheme}}>
          <Provider store={store}>
            <HomeScreen />
          </Provider>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};
