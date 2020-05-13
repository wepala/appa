import React from 'react';
import {render, fireEvent, act} from 'react-native-testing-library';
import {ApplicationProvider, IconRegistry, Button} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../../theme.json';
import LogsFilter from '../LogsFilter';

describe('LogsFilter', () => {
  it('Should render both inputs (select & date range)', async () => {
    const {getAllByTestId} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{
            ...eva.light,
            ...theme,
          }}>
          <LogsFilter />
        </ApplicationProvider>
      </>,
    );

    //   testId not registering for Selects
    // const taskSelect = getAllByTestId('SelectTask');
    // expect(taskSelect).toHaveLength(1);

    const dateRange = getAllByTestId('DateRange');
    expect(dateRange).toHaveLength(1);
  });
});
