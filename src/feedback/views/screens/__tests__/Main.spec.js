import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-native-testing-library';
import {renderHook, act} from '@testing-library/react-hooks';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../../themes/main.json';
import Main from '../Main';
import {mockStories} from '../../../__tests__/fixtures';
import configureStore from 'redux-mock-store';
import ConnectHOC from '../../../../onboarding/controllers/ConnectHOC';

const mockStore = configureStore();

describe('Features Screen', () => {
  const store = mockStore({
    weos: {token: '123', user: {sub: {email: 'qweqwe'}}},
  });
  beforeEach(() => {
    store.clearActions();
  });
  const navigation = {
    goBack: jest.fn(),
  };
  const addFeedback = jest.fn();

  it('Should have a submit button that calls onSubmit then navigates back', () => {
    const handleOpenUrl = jest.fn();
    const handleConnect = jest.fn();

    const {getByTestId, unmount} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{
            ...eva.light,
            ...theme,
          }}>
          <Provider store={store}>
            <Main
              token="token"
              addFeedback={addFeedback}
              navigation={navigation}
              handleConnect={handleConnect}
              handleOpenUrl={handleOpenUrl}
            />
          </Provider>
        </ApplicationProvider>
      </>,
    );

    const submitButton = getByTestId('SubmitButton2');
    // expect(submitButton);

    // Submitting empty required fields
    // fireEvent.press(submitButton[0]);
    // expect(addFeedback).toBeCalled();

    // // Submitting title but blank estimated time
    // fireEvent.changeText(taskTitle[0], 'New Title');
    // fireEvent.press(submitButton[0]);
    // expect(onSave).not.toBeCalled();

    // // Submitting estimated time but blank title
    // fireEvent.changeText(taskTitle[0], 'New Title');
    // fireEvent.press(submitButton[0]);
    // expect(onSave).not.toBeCalled();

    // // Submitting all required fields
    // fireEvent.changeText(taskTitle[0], 'New Title');
    // fireEvent.changeText(taskTime[0], '20');
    // fireEvent.press(submitButton[0]);
    // expect(onUpdate).toBeCalled();

    unmount();
  });
});
