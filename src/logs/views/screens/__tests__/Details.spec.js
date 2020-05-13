import React from 'react';
import {fireEvent, render} from 'react-native-testing-library';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../../theme.json';
import Detail from '../Detail';
import {mockTasks} from '../../../__tests__/fixtures';
import moment from 'moment';

describe('Log Detail Screen', () => {
  it('should render 3 inputs and 2', () => {
    const navigation = {
      goBack: jest.fn(),
    };
    const route = {
      param: {},
    };

    const {getAllByTestId} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{
            ...eva.light,
            ...theme,
          }}>
          <Detail navigation={navigation} route={route} />
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
