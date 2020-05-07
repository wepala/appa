import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {fetchEvents} from '../apis/eventApi';

const mapStateToProps = state => {
  return {
    token: state.token,
    eventCount: state.eventCount,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const Sync = ({token, eventCount, children}) => {
  const [isSyncComplete, setSyncComplete] = useState(false);

  useEffect(() => {
    if (token && eventCount === 0) {
      fetchEvents()
        .then(events => {
          // TODO replay events and dispatch actions to update state
          setSyncComplete(true);
        })
        .catch(error => {
          // TODO notify user of error
          console.log(error);
        });
    } else {
      setSyncComplete(true);
    }
  }, []);

  return isSyncComplete ? children : <></>; // TODO add loading component
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sync);
