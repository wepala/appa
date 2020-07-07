import React from 'react';
import {render, fireEvent, act} from 'react-native-testing-library';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import Profile from '../Profile';

describe('Profile', () => {
  it('should render the profile component correctly', () => {
    const user = {sub: {email: 'example@gmail.com'}};
    const handleLogout = jest.fn();

    const {getAllByTestId, getByTestId} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{
            ...eva.light,
          }}>
          <Profile user={user} handleLogout={handleLogout} />
        </ApplicationProvider>
      </>,
    );

    const SyncButton = getAllByTestId('SyncButton');
    expect(SyncButton).toHaveLength(1);

    const LogoutButton = getAllByTestId('LogoutButton');
    expect(LogoutButton).toHaveLength(1);

    const UserEmail = getByTestId('UserEmail');
    expect(UserEmail.props.children).toBe('example@gmail.com');
  });
});
