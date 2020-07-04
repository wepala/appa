import React from 'react';
import axios from 'axios';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {fireEvent, render} from 'react-native-testing-library';
import SyncHOC from '../SyncHOC';
import Sync from '../../views/Sync';
import {View, Text} from 'react-native';
import events from '../../model/__tests__/events';
import weos from '../../model/reducer';

jest.mock('axios');

describe('Sync HOC', () => {
  const mockStore = configureStore();
  const initialState = {
    weos: {
      token: 'token',
      syncing: false,
      eventCount: 0,
      applicationId: '45bd1547-c867-40fd-b602-64dd4ed7d69e',
      eventsQueue: [
        {
          type: 'ADD_TASK',
          payload: {
            id: '56268018-3057-4a75-80f2-281df7221c9a',
            title: 'Complete Redux tutoral',
            description: 'Finish effects, state, reducers',
            project: 'wepala',
            created: '2020-05-08',
            agendas: ['2020-05-08'],
            dueDate: '2020-04-26',
          },
          meta: {
            id: '56268018-3057-4a75-80f2-281df7221c9a',
            created: '2020-04-14T20:00:59+00:00',
          },
        },
      ],
    },
  };
  const store = mockStore(initialState);

  beforeEach(() => {
    store.clearActions();
  });

  it('should render the sync component', () => {
    const WrappedComponent = SyncHOC(Sync);
    let {getByTestId, unmount} = render(
      <Provider store={store}>
        <WrappedComponent>
          <Text testID="TestSyncing">Syncing</Text>
        </WrappedComponent>
      </Provider>,
    );

    expect(store.getActions()[0].type).toEqual('SET_SYNC');
    const TestSyncing = getByTestId('TestSyncing');
    expect(TestSyncing).toBeTruthy();
    unmount();
  });

  it('should provide a method for getting events', async () => {
    axios.get = jest.fn().mockResolvedValue({data: {...events}});
    const WrappedComponent = SyncHOC(Sync);

    let {getByTestId, unmount} = render(
      <Provider store={store}>
        <WrappedComponent>
          <Text testID="TestSyncing">Syncing</Text>
        </WrappedComponent>
      </Provider>,
    );

    const TestSyncing = getByTestId('TestSyncing');
    expect(TestSyncing).toBeTruthy();
    expect(TestSyncing.parent.props.getEvents).toBeTruthy();
    const data = await TestSyncing.parent.props.getEvents();
    expect(data.events.length).toEqual(5);
    unmount();
  });

  it('should provide a method for pushing events', async () => {
    axios.post = jest
      .fn()
      .mockResolvedValue({data: {message: 'Ok', sequenceNo: 0}});
    const WrappedComponent = SyncHOC(Sync);

    let {getByTestId, unmount} = render(
      <Provider store={store}>
        <WrappedComponent>
          <Text testID="TestSyncing">Syncing</Text>
        </WrappedComponent>
      </Provider>,
    );

    const TestSyncing = getByTestId('TestSyncing');
    expect(TestSyncing).toBeTruthy();
    expect(TestSyncing.parent.props.pushEvents).toBeTruthy();
    const data = await TestSyncing.parent.props.pushEvents();
    expect(data.sequenceNo).toEqual(0);
    unmount();
  });

  it('should sync if connected to weos', async () => {
    axios.get = jest.fn().mockResolvedValue({data: {...events}});
    axios.post = jest
      .fn()
      .mockResolvedValue({data: {message: 'Ok', sequenceNo: 0}});
    const WrappedComponent = SyncHOC(Sync);
    store.replaceReducer(weos);

    let {getByTestId, unmount} = render(
      <Provider store={store}>
        <WrappedComponent>
          <Text testID="TestSyncing">Syncing</Text>
        </WrappedComponent>
      </Provider>,
    );

    const TestSyncing = getByTestId('TestSyncing');
    expect(TestSyncing).toBeTruthy();
    expect(TestSyncing.parent.props.sync).toBeTruthy();
    await TestSyncing.parent.props.sync();
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'EMPTY_QUEUE',
        }),
      ]),
    );
    unmount();
  });

  it('should not try to sync if not connected to weos', async () => {
    axios.get = jest.fn().mockRejectedValue(new Error('An error occured'));
    const WrappedComponent = SyncHOC(Sync);

    let {getByTestId, unmount} = render(
      <Provider store={store}>
        <WrappedComponent>
          <Text testID="TestSyncing">Syncing</Text>
        </WrappedComponent>
      </Provider>,
    );

    const TestSyncing = getByTestId('TestSyncing');
    TestSyncing.parent.props.getEvents = jest.fn();
    TestSyncing.parent.props.pushEvents = jest.fn();
    expect(TestSyncing).toBeTruthy();
    expect(TestSyncing.parent.props.sync).toBeTruthy();
    await expect(TestSyncing.parent.props.sync()).rejects.toThrow(
      'An error occured',
    );
    expect(store.getActions()).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({
          type: 'EMPTY_QUEUE',
        }),
      ]),
    );
    unmount();
  });
});
