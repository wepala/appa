import React from 'react';
import {render, fireEvent, act} from 'react-native-testing-library';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../theme.json';
import Profie from '../Profile';
import PKCE from '../../../weos/auth/pkce';

describe('Profie', () => {
  it('should render the profile component correctly', () => {
    PKCE.logoutURL = jest.fn();
    const logout = jest.fn();
    const account = {emails: ['example@gmail.com', 'joe.doe@gmail.com']};

    const {getAllByTestId} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{
            ...eva.light,
            ...theme,
          }}>
          <Profie
            account={account}
            token={{id_token: 'token'}}
            logout={logout}
          />
        </ApplicationProvider>
      </>,
    );

    const SyncButton = getAllByTestId('SyncButton');
    expect(SyncButton).toHaveLength(1);

    const LogoutButton = getAllByTestId('LogoutButton');
    expect(LogoutButton).toHaveLength(1);
    act(() => {
      fireEvent.press(LogoutButton[0]);
    });
    expect(PKCE.logoutURL).toHaveBeenCalled();
  });
});
