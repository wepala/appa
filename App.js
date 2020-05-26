import 'react-native-gesture-handler';
import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {default as theme} from './theme.json';
import {default as mapping} from './mapping.json';

import HomeScreen from './src/views/HomeScreen';
import {Provider} from 'react-redux';

//store
import store from './src/store';

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider
      {...eva}
      theme={{...eva.light, ...theme}}
      customMapping={mapping}>
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    </ApplicationProvider>
  </>
);
