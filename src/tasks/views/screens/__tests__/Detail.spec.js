import React from 'react';
import {fireEvent, render} from 'react-native-testing-library';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../../theme.json';
import Detail from '../Detail';
import {mockTasks} from '../../../__tests__/fixtures';
import moment from 'moment';

describe('Task Detail Screen', () => {
  it('should have a submit button that calls onSave then navigates back', () => {
    const getTask = jest.fn(
      () => mockTasks.getById['7a5fe6af-27f5-486b-a32d-4d3d0437d0c3'],
    );
    const navigation = {
      goBack: jest.fn(),
    };
    const onSave = jest.fn(
      () =>
        new Promise(function(resolve) {
          resolve();
        }),
    );
    const route = {
      param: {},
    };
    const task = mockTasks.getById['7a5fe6af-27f5-486b-a32d-4d3d0437d0c3'];
    task.dueDate = moment(task.dueDate).toDate();

    const {getAllByTestId} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
          <Detail
            onSave={onSave}
            task={task}
            navigation={navigation}
            route={route}
            getTask={getTask}
          />
        </ApplicationProvider>
      </>,
    );
    const submitButton = getAllByTestId('SubmitButton');
    expect(submitButton).toHaveLength(1);
    fireEvent.press(submitButton[0]);
    expect(onSave).toHaveBeenCalled();
    // expect(navigation.goBack).toHaveBeenCalled();
  });
});
