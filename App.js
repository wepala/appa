import 'react-native-gesture-handler';
import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {AppNavigator} from './js/views/components/ApplicationNavigation';
import {Provider} from 'react-redux';

//store
import store from './js/state/store';

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  </ApplicationProvider>
);
