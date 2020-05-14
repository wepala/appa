import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchEvents} from '../apis/eventApi';
import * as taskActionCreators from '../tasks/model/commands';
import {REMOVE_TASK, UPDATE_TASK, ADD_TASK} from '../tasks/model/commandTypes';
import {SyncSpinner} from '../views/components/Spinners';
import {setEventCount} from '../actions';

const mapStateToProps = state => {
  return {
    eventCount: state.eventCount,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      ...taskActionCreators,
      updateEventCount: setEventCount,
    },
    dispatch,
  );
};

const Sync = ({
  eventCount,
  children,
  addTask,
  removeTask,
  updateTask,
  updateEventCount,
}) => {
  const [isSyncComplete, setSyncComplete] = useState(false);

  useEffect(() => {
    if (eventCount === 0) {
      fetchEvents()
        .then(data => {
          for (let event of data.events) {
            delete event.meta;

            switch (event.type) {
              case ADD_TASK:
                addTask(event.payload);
                break;
              case UPDATE_TASK:
                event.payload.meta = {id: event.payload.id};
                updateTask(event.payload.id, event.payload);
                break;
              case REMOVE_TASK:
                removeTask(event.payload.id);
                break;
            }
          }

          updateEventCount(data.currentCount);
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
