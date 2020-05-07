import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import {ApplicationProvider, IconRegistry, Button} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../../theme.json';
import AgendaDetail from '../Detail';

describe('Details screen', () => {
  const title = 'My Task';
  const time = '9:07 AM';
  const project = 'Projecct X';

  it('Should render a correctly given item prop', async () => {
    const itemData = {
      title,
      time,
      project,
    };
    const onPressItem = jest.fn();
    const {getAllByTestId} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{
            ...eva.light,
            ...theme,
          }}>
          <AgendaDetail item={itemData} onPress={onPressItem} />
        </ApplicationProvider>
      </>,
    );

    // Task Title
    const taskTitle = getAllByTestId('TaskTitle');
    expect(taskTitle).toHaveLength(1);
    // Task Estimated time
    const taskTime = getAllByTestId('TaskEstTime');
    expect(taskTime).toHaveLength(1);
    // Task due date
    const dudeDate = getAllByTestId('TaskDueDate');
    expect(dudeDate).toHaveLength(1);
    // Task Button
    const button = getAllByTestId('SubmitButton');
    expect(button).toHaveLength(1);
  });
});
