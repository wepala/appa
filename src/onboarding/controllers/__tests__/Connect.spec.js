import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../themes/main.json';
import ConnectHoc from '../Connect';
import Connect from '../../views/screens/Connect';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

describe('Connect HOC', () => {
  const WrappedConnect = (props) => ConnectHoc(Connect, props);
  const mockStore = configureStore();
  const initialState = {
    weos: {
      token: null,
    },
  };
  const store = mockStore(initialState);

  it('Render wrapped component correctly', () => {
    const {getAllByTestId} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <Provider store={store}>
          <ApplicationProvider
            {...eva}
            theme={{
              ...eva.light,
              ...theme,
            }}>
            <WrappedConnect />
          </ApplicationProvider>
        </Provider>
      </>,
    );

    const ConnectLayout = getAllByTestId('ConnectLayout');
    expect(ConnectLayout).toHaveLength(1);

    const WeOsConnectBtn = getAllByTestId('WeOsConnectBtn');
    expect(WeOsConnectBtn).toHaveLength(1);
  });
});
