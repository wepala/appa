import React from 'react';
import {render} from 'react-native-testing-library';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../../themes/main.json';
import Agenda from '../Agenda';
import {mockTasks} from '../../../__tests__/fixtures';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));

describe('Agenda List View', () => {
  it('should display the task being worked on at the top', () => {
    const currentItem =
      mockTasks.getById['36212c03-040b-4139-867f-bd76485f4084'];

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
          <Agenda
            items={[]}
            navigation={navigation}
            currentItem={currentItem}
            timeTotals={[20, 90]}
          />
        </ApplicationProvider>
      </>,
    );

    // Task Item
    const item = getAllByTestId('AgendaLayout');
    expect(item).toHaveLength(1);
    unmount();
  });

  it('should display ta placeholder when no items are available', () => {
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
          <Agenda items={[]} navigation={navigation} />
        </ApplicationProvider>
      </>,
    );

    // Task Item
    const placeholder = getAllByTestId('Placeholder');
    expect(placeholder).toHaveLength(1);
    unmount();
  });
});
