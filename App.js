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
    hex: '#4381FF',
  });
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };
  const changeColour = (colourName) => {
    console.log('colour change', colour);
    switch (colourName) {
      case 'violet':
        setColour({val: colours.violet, name: colourName, hex: '#6633D4'});
        break;
      case 'magenta':
        setColour({val: colours.magenta, name: colourName, hex: '#BA46D5'});
        break;
      case 'red':
        setColour({val: colours.red, name: colourName, hex: '#DF437A'});
        break;
      case 'orange':
        setColour({val: colours.orange, name: colourName, hex: '#FA7E4C'});
        break;
      case 'yellow':
        setColour({val: colours.yellow, name: colourName, hex: '#FEC63E'});
        break;
      case 'green':
        setColour({val: colours.green, name: colourName, hex: '#8DD76E'});
        break;
      default:
        setColour({val: colours.default, name: 'default', hex: '#4381FF'});
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
