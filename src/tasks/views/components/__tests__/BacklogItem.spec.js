import React from 'react';
import moment from 'moment';
import {act, fireEvent, render} from 'react-native-testing-library';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from '../../../../../themes/main.json';
import BacklogItem from '../BacklogItem';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));

describe('BacklogItem', () => {
  const title = 'My Task';
  const time = '9:07 AM';

  it('Should render a correctly given item prop', async () => {
    const itemData = {
      title,
      time,
    };
    const index = 1;
    const onPressItem = jest.fn();
    const navigation = jest.fn();
    const addToAgenda = jest.fn(
      () =>
        new Promise(function (resolve) {
          resolve();
        }),
    );

    const {getAllByText, getAllByTestId} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{
            ...eva.light,
            ...theme,
          }}>
          <BacklogItem
            index={index}
            item={itemData}
            onPress={onPressItem}
            navigation={navigation}
            addToAgenda={addToAgenda}
          />
        </ApplicationProvider>
      </>,
    );

    const taskTitle = getAllByText(title);
    expect(taskTitle).toHaveLength(1);

    const item = getAllByTestId('TaskTitle');
    expect(item).toHaveLength(1);
    fireEvent.press(item[0]);
    expect(onPressItem).toHaveBeenCalled();

    const checkBox = getAllByTestId('TaskCheckBox');
    expect(checkBox).toHaveLength(1);

    const button = getAllByTestId('AddToAgenda');
    expect(button).toHaveLength(1);
  });

  it('Should call addToAgenda when the calendar Icon is pressed', async () => {
    const itemData = {
      title,
      time,
    };
    const index = 1;
    const onPressItem = jest.fn();
    const navigation = jest.fn();
    const addToAgenda = jest.fn(
      () =>
        new Promise(function (resolve) {
          resolve();
        }),
    );
    const today = moment().format('YYYY-MM-DD');
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
            index={index}
            item={itemData}
            onPress={onPressItem}
            navigation={navigation}
            addToAgenda={addToAgenda}
          />
        </ApplicationProvider>
      </>,
    );

    const item = getAllByTestId('AddToAgenda');
    expect(item).toHaveLength(1);
    act(() => {
      fireEvent.press(item[0]);
    });
    expect(addToAgenda).toHaveBeenCalled();
    expect(addToAgenda).toHaveBeenCalledWith(itemData, today);
  });

  it('Should make task as completed', async () => {
    const itemData = {
      title,
      time,
      id: '36212c03-040b-4139-867f-bd76485f4084',
    };
    const index = 1;
    const onPressItem = jest.fn();
    const navigation = jest.fn();
    const addToAgenda = jest.fn(
      () =>
        new Promise(function (resolve) {
          resolve();
        }),
    );
    const onComplete = jest.fn(
      () =>
        new Promise(function (resolve) {
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
            index={index}
            item={itemData}
            onPress={onPressItem}
            navigation={navigation}
            addToAgenda={addToAgenda}
            onComplete={onComplete}
          />
        </ApplicationProvider>
      </>,
    );

    const item = getAllByTestId('TaskCheckBox');
    expect(item).toHaveLength(1);
    act(() => {
      fireEvent.press(item[0]);
    });
    expect(onComplete).toHaveBeenCalled();
    expect(onComplete).toHaveBeenCalledWith(itemData.id, true);
  });
});
