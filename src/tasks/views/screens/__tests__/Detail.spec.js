import React from 'react';
import {fireEvent, render} from 'react-native-testing-library';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../../themes/main.json';
import Detail from '../Detail';
import {mockTasks} from '../../../__tests__/fixtures';
import moment from 'moment';

describe('Task Detail Screen', () => {
  it('should have a submit button that calls onSubmit then navigates back', () => {
    const getTask = jest.fn(
      () => mockTasks.getById['7a5fe6af-27f5-486b-a32d-4d3d0437d0c3'],
    );
    const navigation = {
      goBack: jest.fn(),
    };
    const onSave = jest.fn(
      () =>
        new Promise(function (resolve) {
          resolve();
        }),
    );
    const onUpdate = jest.fn(
      () =>
        new Promise(function (resolve) {
          resolve();
        }),
    );
    const route = {
      param: {},
    };
    const task = mockTasks.getById['7a5fe6af-27f5-486b-a32d-4d3d0437d0c3'];
    task.dueDate = moment(task.dueDate).toDate();

    const {getAllByTestId, unmount} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{
            ...eva.light,
            ...theme,
          }}>
          <Detail
            onUpdate={onUpdate}
            onSave={onSave}
            task={task}
            navigation={navigation}
            route={route}
            getTask={getTask}
          />
        </ApplicationProvider>
      </>,
    );

    // Task title
    const taskTitle = getAllByTestId('TaskTitle');
    expect(taskTitle).toHaveLength(1);

    // Task description
    const taskDesc = getAllByTestId('TaskDescription');
    expect(taskDesc).toHaveLength(1);

    // Task estimated time
    const taskTime = getAllByTestId('TaskEstTime');
    expect(taskTime).toHaveLength(1);

    // Task due date
    const dudeDate = getAllByTestId('TaskDueDate');
    expect(dudeDate).toHaveLength(1);
    // Task submit button
    const submitButton = getAllByTestId('SubmitButton');
    expect(submitButton).toHaveLength(1);

    // Submitting empty required fields
    fireEvent.press(submitButton[0]);
    expect(onSave).not.toBeCalled();

    // Submitting title but blank estimated time
    fireEvent.changeText(taskTitle[0], 'New Title');
    fireEvent.press(submitButton[0]);
    expect(onSave).not.toBeCalled();

    // Submitting estimated time but blank title
    fireEvent.changeText(taskTitle[0], 'New Title');
    fireEvent.press(submitButton[0]);
    expect(onSave).not.toBeCalled();

    // Submitting all required fields
    fireEvent.changeText(taskTitle[0], 'New Title');
    fireEvent.changeText(taskTime[0], '20');
    fireEvent.press(submitButton[0]);
    expect(onUpdate).toBeCalled();

    unmount();
  });
});
