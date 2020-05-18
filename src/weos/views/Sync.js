import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {fetchEvents} from '../model/eventApi';
import {SyncSpinner} from '../../views/components/Spinners';
import {setEventCount} from '../model/commands';

const mapStateToProps = state => {
  return {
    eventCount: state.eventCount,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateEventCount: setEventCount,
    dispatch,
  };
};

const Sync = ({eventCount, children, updateEventCount, dispatch}) => {
  const [isSyncComplete, setSyncComplete] = useState(false);

  useEffect(() => {
    if (eventCount === 0) {
      fetchEvents()
        .then(data => {
          for (let event of data.events) {
            event.meta = {id: event.payload.id};
            dispatch(event);
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
  }, [dispatch, eventCount, updateEventCount]);

  return isSyncComplete ? children : <SyncSpinner />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sync);
