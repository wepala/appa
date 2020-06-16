import {render} from 'react-native-testing-library';
import Connect from '../Connect';
import React from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../../theme.json';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));
describe('onboarding Connect screen', () => {
  it('should have button that connects to weos', async () => {
    const {getAllByTestId} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
          <Connect />
        </ApplicationProvider>
      </>,
    );
    const connectButton = getAllByTestId('WeOsConnectBtn');
    expect(connectButton).toHaveLength(1);
  });
});
