import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../../theme.json';
import AgendaItem from '../AgendaItem';

describe('onboarding complete screen', () => {
  const title = 'My Task';
  const time = '9:07 AM';
  const project = 'Project X';

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
    const taskTime = getAllByText(`Time: ${time}`);
    const taskProject = getAllByText(project);
    expect(taskTitle).toHaveLength(1);
    expect(taskTime).toHaveLength(1);
    expect(taskProject).toHaveLength(1);

    // Task CheckBox
    const checkBox = getAllByTestId('TaskCheckBox');
    expect(checkBox).toHaveLength(1);

    // Task Button
    const button = getAllByTestId('TaskButton');
    expect(button).toHaveLength(1);
  });
});
