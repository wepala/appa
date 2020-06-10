import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {Loading} from './src/views/components/Spinner';
import {default as mapping} from './mapping.json';
import {default as brandTheme} from './themes/main.json';
import {default as colours} from './themes/colours.json';
import {ThemeContext} from './theme.context';

import HomeScreen from './src/views/HomeScreen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

//store
import store, {persistor} from './src/store';

export default () => {
  const [theme, setTheme] = React.useState('light');
  const [colour, setColour] = React.useState({
    val: colours.default,
    name: 'default',
  });
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };
  const changeColour = (colourName) => {
    console.log('colour change', colour);
    switch (colourName) {
      case 'violet':
        setColour({val: colours.violet, name: colourName});
        break;
      case 'magenta':
        setColour({val: colours.magenta, name: colourName});
        break;
      case 'red':
        setColour({val: colours.red, name: colourName});
        break;
      case 'orange':
        setColour({val: colours.orange, name: colourName});
        break;
      case 'yellow':
        setColour({val: colours.yellow, name: colourName});
        break;
      case 'green':
        setColour({val: colours.green, name: colourName});
        break;
      default:
        setColour({val: colours.default, name: 'default'});
    }
  };
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{theme, toggleTheme, colour, changeColour}}>
        <ApplicationProvider
          {...eva}
          theme={{...eva[theme], ...brandTheme, ...colour.val}}
          customMapping={mapping}>
          <Provider store={store}>
            <PersistGate loading={<Loading />} persistor={persistor}>
              <HomeScreen />
            </PersistGate>
          </Provider>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};
