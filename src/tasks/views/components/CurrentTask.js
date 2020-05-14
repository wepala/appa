import React, {useState, useEffect, useRef} from 'react';
import moment from 'moment';
import {
  Text,
  Card,
  Layout,
  StyleService,
  Button,
  useStyleSheet,
} from '@ui-kitten/components';
import {StopOutlineIcon} from '../../../views/components/Icons';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default ({item, timeSpentToday, onPress}) => {
  const styles = useStyleSheet(themedStyles);
  item = item === undefined ? {title: 'Lorem Ipsum', project: ''} : item;

  const startedAt = moment(item.startTime);
  let now = moment();
  let diff = now.diff(startedAt, 'seconds');

  const [timer, setTimer] = useState();
  useEffect(() => {
    setTimer(timeSpentToday + diff);
  }, [timeSpentToday, diff]);

  useInterval(() => {
    setTimer(timer + 1);
    now = moment();
  }, 1000);

  let hours = parseInt(timer / 3600, 10);
  let minutes = parseInt(timer / 60, 10) % 60;
  let seconds = timer % 60;

  return (
    <Card testID="CurrentTask" style={styles.item} onPress={onPress}>
      <Layout style={styles.row}>
        <Layout style={styles.column1}>
          <Text numberOfLines={2} category="h5" style={styles.title}>
            {item.title}
          </Text>
        </Layout>
        <Layout style={styles.column2}>
          <Text testID="TotalTime" category="h6">
            {hours > 0 ? `${hours} hrs ` : null}
            {minutes > 0 ? `${minutes} mins ` : null}
            {`${seconds} secs`}
          </Text>
        </Layout>
      </Layout>
      <Layout style={styles.row}>
        <Button
          testID="TaskButton"
          style={styles.button}
          status="danger"
          size="small"
          accessoryRight={StopOutlineIcon}>
          Stop
        </Button>
      </Layout>
    </Card>
  );
};

const themedStyles = StyleService.create({
  item: {
    backgroundColor: '$background-basic-color-3',
    padding: 0,
    marginBottom: 16,
  },

  row: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  column1: {
    backgroundColor: 'transparent',
    width: '50%',
  },
  column2: {
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    width: '50%',
  },
  title: {},
  description: {
    paddingVertical: 8,
    fontStyle: 'italic',
  },
  button: {
    marginTop: 4,
  },
});
