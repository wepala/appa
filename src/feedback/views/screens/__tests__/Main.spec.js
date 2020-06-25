import React, {useState} from 'react';
import {fireEvent, render} from 'react-native-testing-library';
import {renderHook, act} from '@testing-library/react-hooks';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../../themes/main';
import Main from '../Main';
import {mockStories} from '../../../__tests__/fixtures';

describe('Features Screen', () => {
  const navigation = {
    goBack: jest.fn(),
  };
  const addFeedback = jest.fn();

  it('Should have a submit button that calls onSubmit then navigates back', () => {
    const {getAllByTestId, unmount} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{
            ...eva.light,
            ...theme,
          }}>
          <Main addFeedback={addFeedback} navigation={navigation} />
        </ApplicationProvider>
      </>,
    );

    const storyButton = getAllByTestId('StoryButton');
    expect(storyButton).toHaveLength(4);

    const submitButton = getAllByTestId('SubmitButton');
    expect(submitButton).toHaveLength(1);

    // Submitting empty required fields
    fireEvent.press(submitButton[0]);
    expect(addFeedback).toBeCalled();

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
