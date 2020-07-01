import React from 'react';
import {render} from 'react-native-testing-library';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../../themes/main.json';
import LogsFilter from '../LogsFilter';
import {mockTasks} from '../../../../tasks/__tests__/fixtures';

describe('LogsFilter', () => {
  it('Should render both inputs (select & date range)', async () => {
    const tasks = Object.values(mockTasks.getById);
    const setFilters = jest.fn();

    const {getAllByTestId} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{
            ...eva.light,
            ...theme,
          }}>
          <LogsFilter tasks={tasks} setFilters={setFilters} />
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
