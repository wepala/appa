import React from 'react';
import {render} from 'react-native-testing-library';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../../theme.json';
import Backlog from '../Backlog';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));

describe('Backlog List View', () => {
  it('should display placeholder when no items are available', () => {
    const navigation = {
      isFocused: jest.fn(),
    };
    const {getAllByTestId, unmount} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{
            ...eva.light,
            ...theme,
          }}>
          <Backlog navigation={navigation} items={[]} />
        </ApplicationProvider>
      </>,
    );

    // Task Item
    const placeholder = getAllByTestId('Placeholder');
    expect(placeholder).toHaveLength(1);
    unmount();
  });
});
