import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchEvents} from '../apis/eventApi';
import * as taskActionCreators from '../tasks/model/commands';
import {REMOVE_TASK, UPDATE_TASK, ADD_TASK} from '../tasks/model/commandTypes';
import {SyncSpinner} from '../views/components/Spinners';
const mapStateToProps = state => {
  return {
    token: state.token,
    eventCount: state.eventCount,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(taskActionCreators, dispatch);
};

const Sync = ({
  token,
  eventCount,
  children,
  syncTask,
  removeTask,
  updateTask,
}) => {
  const [isSyncComplete, setSyncComplete] = useState(false);

  useEffect(() => {
    if (token && eventCount === 0) {
      fetchEvents()
        .then(data => {
          console.log(data);
          for (let event of data.events) {
            switch (event.type) {
              case ADD_TASK:
                syncTask(event.payload);
                break;
              case UPDATE_TASK:
                updateTask(event.payload.id, event.payload);
                break;
              case REMOVE_TASK:
                removeTask(event.payload.id);
                break;
            }
          }
          setSyncComplete(true);
        })
        .catch(error => {
          // TODO notify user of error
          console.log(error);
          setSyncComplete(true);
        });
    } else {
      setSyncComplete(true);
    }
  }, []);

  return isSyncComplete ? children : <SyncSpinner />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sync);
