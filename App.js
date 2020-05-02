import 'react-native-gesture-handler';
import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {default as theme} from './theme.json';

import HomeScreen from './src/views/HomeScreen';
import {Provider} from 'react-redux';
import PKCEWrapper from './src/auth/PKCEWrapper';

//store
import store from './src/store';

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
      <PKCEWrapper>
        <Provider store={store}>
          <HomeScreen />
        </Provider>
      </PKCEWrapper>
    </ApplicationProvider>
  </>
);
