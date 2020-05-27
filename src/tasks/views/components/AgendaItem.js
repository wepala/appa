import React, {useState} from 'react';
import {PlayIcon} from '../../../views/components/Icons';

import {
  Text,
  Card,
  Layout,
  Button,
  CheckBox,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';

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
    <Layout style={styles.row}>
      <Layout style={styles.column1}>
        <CheckBox
          testID={'TaskCheckBox'}
          checked={checked}
          onChange={() =>
            onComplete(item.id, !checked).then(toggleCheck(!checked))
          }
        />
      </Layout>
      <Layout style={styles.column2}>
        <Card
          testID={'TaskItem'}
          style={
            checked
              ? [styles.item, styles.checkedItem]
              : active
              ? [styles.item, styles.activeItem]
              : styles.item
          }
          onPress={onPress}
          x>
          <Layout style={styles.row}>
            <Layout style={styles.column1}>
              <Text
                numberOfLines={1}
                category="s1"
                style={checked && styles.checked}>
                {item.title}
              </Text>
              <Text style={styles.timeSpent}>
                Time:{' '}
                {currentTimeSpent.hours > 0
                  ? `${currentTimeSpent.hours}hrs `
                  : null}
                {currentTimeSpent.minutes > 0
                  ? `${currentTimeSpent.minutes}mins `
                  : null}
                {`${currentTimeSpent.seconds}secs`}
              </Text>
              <Text style={styles.estimatedTime}>
                Estimated:{' '}
                {estimatedTime.hours > 0 ? `${estimatedTime.hours}hrs ` : null}
                {estimatedTime.minutes > 0
                  ? `${estimatedTime.minutes}mins `
                  : null}
                {`${estimatedTime.seconds}secs`}
              </Text>
            </Layout>
            <Layout style={styles.column2}>
              <Button
                testID={'TaskButton'}
                size="small"
                status="success"
                accessoryLeft={PlayIcon}
                onPress={() => {
                  onStart(item.id);
                  setCurrentIndex(index);
                }}
              />
            </Layout>
          </Layout>
        </Card>
      </Layout>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  item: {
    marginVertical: 8,
    padding: 0,
  },
  activeItem: {
    borderLeftWidth: 9,
    borderLeftColor: '$color-primary-500',
  },
  checkedItem: {
    borderLeftWidth: 9,
    borderLeftColor: '$color-success-500',
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },

  column1: {
    backgroundColor: 'transparent',
    flexBasis: 'auto',
    flexShrink: 0,
    justifyContent: 'center',
  },
  column2: {
    backgroundColor: 'transparent',
    paddingVertical: 2,
    paddingLeft: 16,
    justifyContent: 'space-between',
    flex: 1,
  },
  timeSpent: {
    paddingVertical: 8,
    justifyContent: 'center',
  },
  estimatedTime: {
    color: '$color-basic-600',
  },
  icon: {
    width: 20,
    height: 20,
    margin: 0,
    padding: 0,
  },
  checked: {
    fontStyle: 'italic',
    textDecorationLine: 'line-through',
    color: '$color-basic-600',
  },
});

export default TaskItem;
