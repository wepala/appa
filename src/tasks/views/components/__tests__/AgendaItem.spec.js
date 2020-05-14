import React from 'react';
import {render, fireEvent, act} from 'react-native-testing-library';
import {ApplicationProvider, IconRegistry, Button} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../../theme.json';
import AgendaItem from '../AgendaItem';

describe('onboarding complete screen', () => {
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
    const {getAllByText, getAllByTestId} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{
            ...eva.light,
            ...theme,
          }}>
          <AgendaItem item={itemData} onPress={onPressItem} />
        </ApplicationProvider>
      </>,
    );

    // Task Item
    const item = getAllByTestId('TaskItem');
    expect(item).toHaveLength(1);
    fireEvent.press(item[0]);
    expect(onPressItem).toHaveBeenCalled();

    // Task text
    const taskTitle = getAllByText(title);
    // const taskTime = getAllByText(`Time: ${time}`);
    const taskProject = getAllByText(project);
    expect(taskTitle).toHaveLength(1);
    // expect(taskTime).toHaveLength(1);
    expect(taskProject).toHaveLength(1);
    // Task CheckBox
    const checkBox = getAllByTestId('TaskCheckBox');
    expect(checkBox).toHaveLength(1);
    // Task Button
    const button = getAllByTestId('TaskButton');
    expect(button).toHaveLength(1);
  });
  it('Should call onComplete when the checkbox is pressed', async () => {
    const itemData = {
      title,
      time,
      project,
    };
    const onPressItem = jest.fn();
    const onComplete = jest.fn(
      () =>
        new Promise(function(resolve) {
          resolve();
        }),
    );
    const {getAllByTestId} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{
            ...eva.light,
            ...theme,
          }}>
          <AgendaItem
            item={itemData}
            onPress={onPressItem}
            onComplete={onComplete}
          />
        </ApplicationProvider>
      </>,
    );

    // Task Item
    const item = getAllByTestId('TaskCheckBox');
    expect(item).toHaveLength(1);
    act(() => {
      fireEvent.press(item[0]);
    });
    expect(onComplete).toHaveBeenCalled();
  });

  it('Should call onStart when the play button is pressed', async () => {
    const itemData = {
      title,
      time,
      project,
    };
    const onPressItem = jest.fn();
    const onComplete = jest.fn(
      () =>
        new Promise(function(resolve) {
          resolve();
        }),
    );
    const onStart = jest.fn(
      () =>
        new Promise(function(resolve) {
          resolve();
        }),
    );
    const {getAllByTestId} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{
            ...eva.light,
            ...theme,
          }}>
          <AgendaItem
            item={itemData}
            onPress={onPressItem}
            onComplete={onComplete}
            onStart={onStart}
          />
        </ApplicationProvider>
      </>,
    );

    // Task Item
    const item = getAllByTestId('TaskButton');
    expect(item).toHaveLength(1);
    act(() => {
      fireEvent.press(item[0]);
    });
    expect(onStart).toHaveBeenCalled();
  });
});
