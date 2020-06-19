import React from 'react';
import {render, fireEvent, act} from 'react-native-testing-library';
import {ApplicationProvider, IconRegistry, Button} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../../theme.json';
import LogItem from '../LogItem';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));

describe('LogItem', () => {
  it('Should render all fields given a log item', async () => {
    const item = {
      id: 'f4cb9236-2df7-4abd-8c06-cb836865a1c3',
      startTime: '2020-05-12T13:00:00-04:00',
      task: {title: 'My Task'},
    };
    const {getByTestId} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{
            ...eva.light,
            ...theme,
          }}>
          <LogItem item={item} />
        </ApplicationProvider>
      </>,
    );

    const userAvatar = getByTestId('UserAvatar');
    const logTitle = getByTestId('LogTitle');
    const logDate = getByTestId('LogDate');
    const logTime = getByTestId('LogTime');

    expect(userAvatar).toBeTruthy();

    expect(logTitle).toBeTruthy();
    expect(logTitle.props.children).toEqual('My Task');

    expect(logDate).toBeTruthy();
    expect(logDate.props.children).toEqual('12th May, 2020');

    expect(logTime).toBeTruthy();
    expect(logTime.props.children).toEqual('5:00:00 pm');
  });
});
