import React, {useState, useEffect} from 'react';
import moment from 'moment';

import {
  Text,
  Card,
  Layout,
  Button,
  CheckBox,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';

const BacklogItem = ({
  navigation,
  item,
  index,
  onPress,
  addToAgenda,
  onComplete,
  timeSpentToday,
}) => {
  const [checked, toggleCheck] = useState(item.complete);

  useEffect(() => {
    toggleCheck(item.complete);
  }, [item]);

  const styles = useStyleSheet(themedStyles);

  const onAddToAgenda = () => {
    addToAgenda(item, moment().format('YYYY-MM-DD')).then(() =>
      navigation.navigate('Today'),
    );
  };

  let currentTimeSpent = {
    hours: parseInt(timeSpentToday / 3600, 10),
    minutes: parseInt(timeSpentToday / 60, 10) % 60,
    seconds: timeSpentToday % 60,
  };

  let estimatedTime = {
    hours: parseInt(item.estimatedTime / 3600, 10),
    minutes: parseInt(item.estimatedTime / 60, 10) % 60,
    seconds: item.estimatedTime % 60,
  };
  return (
    <Layout key={item.id} style={styles.item}>
      <CheckBox
        testID={'TaskCheckBox'}
        style={styles.checkBox}
        status="primary"
        checked={checked}
        onChange={() =>
          onComplete(item.id, !checked).then(toggleCheck(!checked))
        }
      />
      <Card
        testID={'TaskItem'}
        style={styles.card}
        onPress={() => onPress(index)}>
        <Layout style={styles.row}>
          <Layout style={styles.column1}>
            <Text testID="TaskTitle" numberOfLines={1} category="h6">
              {item.title}
            </Text>
            <Text category="s2" appearance="hint" style={styles.timeSpent}>
              Time Spent:{' '}
              {currentTimeSpent.hours > 0
                ? `${currentTimeSpent.hours}h `
                : null}
              {currentTimeSpent.minutes > 0
                ? `${currentTimeSpent.minutes}m `
                : null}
              {`${currentTimeSpent.seconds}s`}
              {' | '}
              {estimatedTime.hours > 0 ? `${estimatedTime.hours}h ` : null}
              {estimatedTime.minutes > 0 ? `${estimatedTime.minutes}m ` : null}
            </Text>
          </Layout>

          <Layout style={styles.column2}>
            <Button
              testID={'AddToAgenda'}
              style={styles.buttonStart}
              status="warning"
              size="tiny"
              appearance="outline"
              onPress={onAddToAgenda}>
              <FontAwesomeIcon icon={faCalendarAlt} color="#Ff985f" />
            </Button>
          </Layout>
        </Layout>
      </Card>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  item: {
    marginVertical: 16,
    paddingHorizontal: 16,
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
    marginLeft: 16,
    borderRadius: 7,
    borderColor: '$background-basic-color-1',
    borderWidth: 0,
    borderLeftWidth: 10,
    flex: 1,
    elevation: 2,
  },

  row: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },

  column1: {
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    flex: 1,
    marginRight: 8,
  },
  column2: {
    backgroundColor: 'transparent',
    width: 'auto',
    justifyContent: 'center',
  },

  timeSpent: {
    paddingVertical: 4,
  },
  estimatedTime: {
    textAlign: 'center',
  },
  buttonStart: {
    textAlign: 'center',
    alignItems: 'center',
  },
});

export default BacklogItem;
