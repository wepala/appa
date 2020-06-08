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

export default ({item, index, timeSpentToday, onPress, stopTask}) => {
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
  }, 1000);

  let hours = parseInt(timer / 3600, 10);
  let minutes = parseInt(timer / 60, 10) % 60;
  let seconds = timer % 60;

  return (
    <Layout style={styles.item}>
      <Card testID="CurrentTask" style={styles.card} onPress={onPress}>
        <Text numberOfLines={1} category="h5" style={styles.title}>
          {item.title}
        </Text>
        {item.project ? <Text category="s2">{item.project}</Text> : null}
      </Card>
      <Card disabled style={styles.subCard.item}>
        <Layout style={styles.subCard.content}>
          <Text testID="TotalTime" category="h6" style={styles.subCard.timer}>
            {hours > 0 ? `${hours}h ` : null}
            {minutes > 0 ? `${minutes}m ` : null}
            {`${seconds}s`}
          </Text>
          <Button
            testID="TaskButton"
            style={styles.button}
            status="danger"
            size="tiny"
            onPress={() => stopTask('_stop')}>
            stop
          </Button>
        </Layout>
      </Card>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  item: {
    paddingHorizontal: 16,
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderWidth: 0,

    shadowColor: '#777',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
  card: {
    height: 'auto',
    paddingBottom: 32,
    backgroundColor: '$color-primary-500',
    borderRadius: 7,
    borderColor: 'transparent',
    borderWidth: 0,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    elevation: 5,
  },
  title: {
    color: '#fff',
  },
  subCard: {
    item: {
      height: 50,
      position: 'absolute',
      bottom: -15,
      right: 30,
      width: '50%',
      borderRadius: 7,
      borderColor: 'transparent',
      borderWidth: 0,
      alignItems: 'flex-end',
      justifyContent: 'center',
      elevation: 5,
    },
    content: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      margin: -8,
    },
    timer: {
      marginRight: 16,
      marginBottom: 2,
    },
  },
  button: {
    borderRadius: 10,
    fontSize: 18,
  },
});
