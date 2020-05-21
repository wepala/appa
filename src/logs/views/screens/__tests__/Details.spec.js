import React from 'react';
import {fireEvent, render} from 'react-native-testing-library';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../../theme.json';
import Detail from '../Detail';
import {mockLogs} from '../../../__tests__/fixtures';
import {mockTasks} from '../../../../tasks/__tests__/fixtures';

describe('Log Detail Screen', () => {
  it('should render 3 inputs and 2', () => {
    const getLog = jest.fn(() => ({
      ...mockLogs.getById.get('f4cb9236-2df7-4abd-8c06-cb836865a1c3'),
      task: mockTasks.getById['7a5fe6af-27f5-486b-a32d-4d3d0437d0c3'],
    }));

    const getTasks = jest.fn(() => Object.values(mockTasks.getById));

    const navigation = {
      goBack: jest.fn(),
    };
    const route = {
      param: {},
    };

    const onSave = jest.fn(
      () =>
        new Promise(function(resolve) {
          resolve();
        }),
    );

    const onUpdate = jest.fn(
      () =>
        new Promise(function(resolve) {
          resolve();
        }),
    );

    const onRemove = jest.fn(
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
          <Detail
            onUpdate={onUpdate}
            onSave={onSave}
            navigation={navigation}
            route={route}
            getLog={getLog}
            onRemove={onRemove}
            getTasks={getTasks}
          />
        </ApplicationProvider>
      </>,
    );

    // Task title
    const taskTitle = getAllByTestId('TaskTitle');
    expect(taskTitle).toHaveLength(1);

    // Log hour
    const taskDesc = getAllByTestId('LoggedHour');
    expect(taskDesc).toHaveLength(1);
    // Log minute
    const taskTime = getAllByTestId('LoggedMinute');
    expect(taskTime).toHaveLength(1);

    // Log submit button
    const submitButton = getAllByTestId('SubmitButton');
    expect(submitButton).toHaveLength(1);
    // Log cancel button
    const cancelButton = getAllByTestId('CancelButton');
    expect(cancelButton).toHaveLength(1);

    fireEvent.press(cancelButton[0]);
    expect(navigation.goBack).toBeCalled();
  });
});
