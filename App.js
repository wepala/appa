import 'react-native-gesture-handler';
import React, {useState} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {default as theme} from './theme.json';

import HomeScreen from './src/views/HomeScreen';
import {Provider} from 'react-redux';

//store
import store from './src/store';

export default () => {
  const {light, dark} = eva;
  const [mode, setMode] = useState(false);
  setMode(mode => (mode ? light : dark));
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
        <Provider store={store}>
          <HomeScreen />
        </Provider>
      </ApplicationProvider>
    </>
  );
};
