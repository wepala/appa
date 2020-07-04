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

      try {
        if (!token) {
          throw new Error('Missing token, Please login to Sync');
        }

        let response = await axios.get(`${AUTHORIZE_URL}/events/get`, {
          headers: {
            Authorization: `${token.token_type} ${token.access_token}`,
            ETag: `${applicationId}.${eventCount}`,
          },
        });

        return response.data;
      } catch (error) {
        console.log('An error occured while fetching events', error);
      }
    };

    /**
     * Push events to weos
     */
    pushEvents = async () => {
      const {eventsQueue, token} = this.props.weos;

      if (eventsQueue.length === 0) {
        return;
      }

      try {
        if (!token) {
          throw new Error('Missing token, Please login to Sync');
        }

        let response = await axios.post(
          `${AUTHORIZE_URL}/events/add`,
          eventsQueue,
          {
            headers: {
              Authorization: `${token.token_type} ${token.access_token}`,
            },
          },
        );

        this.props.emptyQueue();
        return response.data;
      } catch (error) {
        console.log('An error occured while pushing events', error);
      }
    };

    sync = async () => {
      this.props.setSync(true);
      await axios.get(`${AUTHORIZE_URL}/health`);
      let {events, currentCount} = await this.getEvents();

      for (let event of events) {
        event.meta = {id: event.payload.id};
        this.props.dispatch(event);
      }

      this.props.setEventCount(currentCount);
      await this.pushEvents();
      this.props.setSync(false);
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          getEvents={this.getEvents}
          pushEvents={this.pushEvents}
          syncing={this.props.weos.syncing}
          setSync={this.props.setSync}
          sync={this.sync}
        />
      );
    }
  };

  return connect(mapStateToProps, mapDispatchToProps)(SyncHOC);
};

export default syncWeos;
