import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import {ApplicationProvider, IconRegistry, Button} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../../theme.json';
import CurrentTask from '../CurrentTask';

describe('Current Task component', () => {
  const title = 'My Task';
  const totalTime = '4h 23m 32s';
  const project = 'Projecct X';

  it('Should render a correctly given item prop', async () => {
    const itemData = {
      title,
      totalTime,
    };
    const onPressItem = jest.fn();
    const {getAllByText, getAllByTestId} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{
            ...eva.light,
            ...theme,
          }}>
          <CurrentTask item={itemData} onPress={onPressItem} />
        </ApplicationProvider>
      </>,
    );

    // Task Item
    const item = getAllByTestId('CurrentTask');
    expect(item).toHaveLength(1);
    fireEvent.press(item[0]);
    expect(onPressItem).toHaveBeenCalled();

    // Task text
    const taskTitle = getAllByText(title);
    const taskTotalTime = getAllByTestId('TotalTime');
    expect(taskTitle).toHaveLength(1);
    expect(taskTotalTime).toHaveLength(1);

    // // Task Button
    const button = getAllByTestId('TaskButton');
    expect(button).toHaveLength(1);
  });
});
