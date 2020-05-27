import React from 'react';
import {render} from 'react-native-testing-library';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../../theme.json';
import Agenda from '../Agenda';
import {mockTasks} from '../../../__tests__/fixtures';

describe('Agenda List View', () => {
  it('should display the task being worked on at the top', () => {
    const currentItem =
      mockTasks.getById['36212c03-040b-4139-867f-bd76485f4084'];

    const {getAllByTestId, unmount} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{
            ...eva.light,
            ...theme,
          }}>
          <Agenda currentItem={currentItem} timeTotals={[20, 90]} />
        </ApplicationProvider>
      </>,
    );

    // Task Item
    const item = getAllByTestId('AgendaLayout');
    expect(item).toHaveLength(1);
    unmount();
  });
});
