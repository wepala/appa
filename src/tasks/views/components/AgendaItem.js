import React, {useState} from 'react';
import {
  Text,
  Card,
  Button,
  Layout,
  CheckBox,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlay} from '@fortawesome/free-solid-svg-icons';

const TaskItem = ({
  item,
  index,
  onPress,
  onComplete,
  onStart,
  setCurrentIndex,
  timeSpentToday,
  active,
}) => {
  console.log(active);
  const [checked, toggleCheck] = useState(false);
  const styles = useStyleSheet(themedStyles);
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
    <Layout style={styles.item}>
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
        style={
          active
            ? [styles.card, styles.active.card]
            : checked
            ? [styles.card, styles.checked.card]
            : styles.card
        }
        onPress={onPress}>
        <Layout style={styles.row}>
          <Layout style={styles.column1}>
            <Text
              numberOfLines={1}
              category="h6"
              style={checked && styles.checked.title}>
              {item.title}
            </Text>
            {timeSpentToday > 0 ? (
              <Text category="s2" appearance="hint" style={styles.timeSpent}>
                Time Spent:{' '}
                {currentTimeSpent.hours > 0
                  ? `${currentTimeSpent.hours}h `
                  : null}
                {currentTimeSpent.minutes > 0
                  ? `${currentTimeSpent.minutes}m `
                  : null}
                {`${currentTimeSpent.seconds}s`}
              </Text>
            ) : null}
          </Layout>

          <Layout style={styles.column2}>
            <Button
              testID={'TaskButton'}
              style={styles.buttonStart}
              status="primary"
              size="small"
              appearance="ghost"
              onPress={() => {
                onStart(item.id);
                setCurrentIndex(index);
              }}>
              <FontAwesomeIcon icon={faPlay} color="#4381FF" />
            </Button>
            <Text status="primary" category="c1" style={styles.estimatedTime}>
              {estimatedTime.hours > 0 ? `${estimatedTime.hours}h ` : null}
              {estimatedTime.minutes > 0 ? `${estimatedTime.minutes}m ` : null}
            </Text>
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
    borderColor: 'transparent',
    borderWidth: 0,
    borderLeftWidth: 10,
    flex: 1,
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

  timeSpent: {},
  estimatedTime: {
    textAlign: 'center',
  },
  buttonStart: {
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 6,
    paddingHorizontal: 4,
  },
  checkBox: {
    backgroundColor: 'transparent',
  },

  // States
  active: {
    card: {
      borderLeftColor: '#4381FF',
    },
  },
  checked: {
    title: {
      fontStyle: 'italic',
      textDecorationLine: 'line-through',
    },
    card: {
      backgroundColor: '#edf8ff',
    },
  },
});

export default TaskItem;
