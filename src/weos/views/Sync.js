import React, {useEffect} from 'react';
import {SyncSpinner} from '../../views/components/Spinners';

const Sync = ({children, syncing, sync, setSync}) => {
  useEffect(() => {
    sync().catch((error) => {
      console.log('Cannot complete sync. Please try again later');
      setSync(false);
    });
  }, [sync, setSync]);

  return syncing ? <SyncSpinner /> : children;
};

export default Sync;
