import React from 'react';
import {render, fireEvent, act} from 'react-native-testing-library';
import {ApplicationProvider, IconRegistry, Button} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../../theme.json';
import LogItem from '../LogItem';

describe('LogItem', () => {
  it('Should render all fields given a log item', async () => {
    const item = {
      title: 'My Task',
      startTime: '2020-05-12T13:00:00-04:00',
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
    expect(logTime.props.children).toEqual('1:00:00 pm');
  });
});