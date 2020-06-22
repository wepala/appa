import React from 'react';
import {act, cleanup, fireEvent, render} from 'react-native-testing-library';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../../themes/main.json';
import CurrentTask from '../CurrentTask';

describe('Current Task component', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    cleanup();
  });

  const title = 'My Task';
  const totalTime = '4h 23m 32s';
  it('Should render a correctly given item prop', async () => {
    const itemData = {
      title,
      totalTime,
    };
    const onPressItem = jest.fn();
    const {getAllByText, getAllByTestId, unmount} = render(
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
    act(() => jest.advanceTimersByTime(1000));

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

    // Task Button
    const button = getAllByTestId('TaskButton');
    expect(button).toHaveLength(1);
    unmount();
  });
});
