import React, {useEffect} from 'react';
import {SyncSpinner} from '../../views/components/Spinners';

const Sync = ({
  children,
  dispatch,
  getEvents,
  pushEvents,
  setSync,
  syncing,
}) => {
  useEffect(() => {
    setSync(true);

    const replayEvents = async () => {
      let {events} = await getEvents();
      for (let event of events) {
        event.meta = {id: event.payload.id};
        dispatch(event);
      }

      await pushEvents();
      setSync(false);
    };

    replayEvents();
    setSync(false);
  }, []);

  return syncing ? <SyncSpinner /> : children;
};

export default Sync;
