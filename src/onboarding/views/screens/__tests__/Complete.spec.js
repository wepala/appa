import {render, fireEvent} from 'react-native-testing-library';
import Complete from '../Complete';
import React from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../../themes/main.json';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));
describe('onboarding complete screen', () => {
  it('should have button that completes the process', async () => {
    const onComplete = jest.fn();
    const {getAllByTestId} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
          <Complete onComplete={onComplete} />
        </ApplicationProvider>
      </>,
    );
    const completeButton = getAllByTestId('CompleteButton');
    expect(completeButton).toHaveLength(1);
    fireEvent.press(completeButton[0]);
    expect(onComplete).toHaveBeenCalled();
  });
});
