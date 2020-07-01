import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../themes/main.json';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Linking} from 'react-native';
import ConnectHoc from '../ConnectHOC';
import Connect from '../../views/screens/Connect';

describe('Connect HOC', () => {
  const mockStore = configureStore();
  const initialState = {
    weos: {
      token: 'token',
      user: {
        sub: {
          email: 'joe.doe@example.com',
        },
      },
    },
  };
  const store = mockStore(initialState);
  const navigation = jest.fn();

  it('Should render wrapped component with props', () => {
    const WrappedConnect = ConnectHoc(Connect);
    const {getByTestId, unmount} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <Provider store={store}>
          <ApplicationProvider
            {...eva}
            theme={{
              ...eva.light,
              ...theme,
            }}>
            <WrappedConnect navigation={navigation} />
          </ApplicationProvider>
        </Provider>
      </>,
    );

    const ConnectSafeAreaView = getByTestId('ConnectSafeAreaView');
    expect(ConnectSafeAreaView.parent.props.navigation).toBeTruthy();
    expect(ConnectSafeAreaView.parent.props.handleConnect).toBeTruthy();
    expect(ConnectSafeAreaView.parent.props.loading).toBe(false);
    expect(ConnectSafeAreaView.parent.props.componentState).toEqual(
      expect.objectContaining({
        user: {
          sub: {
            email: 'joe.doe@example.com',
          },
        },
      }),
    );

    const ConnectLayout = getByTestId('ConnectLayout');
    expect(ConnectLayout).toBeTruthy();

    const WeOsConnectBtn = getByTestId('WeOsConnectBtn');
    expect(WeOsConnectBtn).toBeTruthy();
    unmount();
  });

  it('should provide a method for handling connecting to weos', () => {
    const WrappedConnect = ConnectHoc(Connect);
    Linking.openUrl = jest.fn();
    const {getByTestId, unmount} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <Provider store={store}>
          <ApplicationProvider
            {...eva}
            theme={{
              ...eva.light,
              ...theme,
            }}>
            <WrappedConnect navigation={navigation} />
          </ApplicationProvider>
        </Provider>
      </>,
    );

    const ConnectSafeAreaView = getByTestId('ConnectSafeAreaView');
    expect(ConnectSafeAreaView.parent.props.handleConnect).toBeTruthy();
    unmount();
  });
});
