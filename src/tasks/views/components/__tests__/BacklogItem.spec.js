import React from 'react';
import {render, fireEvent, act} from 'react-native-testing-library';
import {ApplicationProvider, IconRegistry, Button} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../../theme.json';
import AgendaItem from '../AgendaItem';
import BacklogItem from '../BacklogItem';
import {mockTasks} from '../../../__tests__/fixtures';

describe('Backlog Item', () => {
  it('should have a button to add item to agenda', () => {
    const itemData = mockTasks.getById['7a5fe6af-27f5-486b-a32d-4d3d0437d0c3'];
    const onPressItem = jest.fn();
    const onAddToAgenda = jest.fn(
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
          <BacklogItem
            item={itemData}
            onPress={onPressItem}
            onAddToAgenda={onAddToAgenda}
          />
        </ApplicationProvider>
      </>,
    );

    // Task Item
    const item = getAllByTestId('AddAgendaButton');
    expect(item).toHaveLength(1);
    act(() => {
      fireEvent.press(item[0]);
    });
    expect(onAddToAgenda).toHaveBeenCalled();
  });
});
