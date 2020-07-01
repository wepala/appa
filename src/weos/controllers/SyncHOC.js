import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import {AUTHORIZE_URL} from 'react-native-dotenv';
import {setSync, emptyQueue, setEventCount} from '../model/commands';

const mapStateToProps = (state) => ({
  weos: state.weos,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  ...bindActionCreators({setSync, emptyQueue, setEventCount}, dispatch),
});

const syncWeos = (WrappedComponent) => {
  const SyncHOC = class extends Component {
    /**
     * Gets events from weos
     */
    getEvents = async () => {
      const {applicationId, eventCount, token} = this.props.weos;

      if (!token) {
        throw new Error('Missing token, Please login to Sync');
      }

      try {
        let response = await axios.get(`${AUTHORIZE_URL}/events/get`, {
          headers: {
            Authorization: `${token.token_type} ${token.access_token}`,
            ETag: `${applicationId}.${eventCount}`,
          },
        });

        if (response.status >= 400) {
          throw new Error(response.data.error);
        }

        this.props.setEventCount(response.data.currentCount);
        return response.data;
      } catch (error) {
        console.error('An error occured while fetching events', error);
      }
    };

    /**
     * Push events to weos
     */
    pushEvents = async () => {
      const {eventQueue, token} = this.props.weosState;

      if (eventQueue.length === 0) {
        return;
      }

      if (!token) {
        throw new Error('Missing token, Please login to Sync');
      }

      try {
        let response = await axios.post(
          `${AUTHORIZE_URL}/events/add`,
          eventQueue,
          {
            headers: {
              Authorization: `${token.token_type} ${token.access_token}`,
            },
          },
        );

        if (response.status >= 400) {
          throw new Error(response.data.error);
        }

        this.props.emptyQueue();
        return response.data;
      } catch (error) {
        console.error('An error occured while pushing events', error);
      }
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          getEvents={this.getEvents}
          pushEvents={this.pushEvents}
          dispatch={this.dispatch}
          syncing={this.props.weos.syncing}
          setSync={this.props.setSync}
        />
      );
    }
  };

  return connect(mapStateToProps, mapDispatchToProps)(SyncHOC);
};

export default syncWeos;
