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
import PKCE from '../../../weos/auth/pkce';
import Main from '../../../settings/views/screens/Main';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));

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
  const navigation = jest.fn();

  it('Should render wrapped component with props', () => {
    const store = mockStore(initialState);
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
    const store = mockStore(initialState);
    const WrappedConnect = ConnectHoc(Connect);
    PKCE.authorizeURL = jest.fn();
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
    const WeOsConnectBtn = getByTestId('WeOsConnectBtn');
    fireEvent.press(WeOsConnectBtn);
    expect(PKCE.authorizeURL).toHaveBeenCalled();
    unmount();
  });

  it('should provide a method for logging out of weos', () => {
    const store = mockStore(initialState);
    const WrappedConnect = ConnectHoc(Main);
    Linking.openUrl = jest.fn();
    PKCE.logoutURL = jest.fn();
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
    expect(ConnectSafeAreaView.parent.props.handleLogout).toBeTruthy();
    const LogoutBtn = getByTestId('LogoutBtn');
    fireEvent.press(LogoutBtn);
    expect(PKCE.logoutURL).toHaveBeenCalled();
    unmount();
  });
});
