import 'react-native-gesture-handler';
import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {Loading} from './src/views/components/Spinner';
import {default as mapping} from './mapping.json';
import {default as brandTheme} from './theme.json';
import {ThemeContext} from './theme.context';

import HomeScreen from './src/views/HomeScreen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

//store
import store, {persistor} from './src/store';

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
        <ApplicationProvider
          {...eva}
          theme={{...eva[theme], ...brandTheme}}
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
