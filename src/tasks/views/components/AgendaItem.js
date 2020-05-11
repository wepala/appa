import React, {useState} from 'react';
import {ClockIcon, PlayIcon} from '../../../views/components/Icons';

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
  let hours = parseInt(timeSpentToday / 3600, 10);
  let minutes = parseInt(timeSpentToday / 60, 10) % 60;
  let seconds = timeSpentToday % 60;

  return (
    <Card
      testID={'TaskItem'}
      style={styles.item}
      onPress={onPress}
      status={checked ? 'success' : active ? 'basic' : null}>
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
          <Text category="s1" style={checked && styles.checked}>
            {item.title}
          </Text>
          <Text style={styles.time}>
            Time: {hours > 0 ? `${hours}hrs ` : null}
            {minutes > 0 ? `${minutes}mins ` : null}
            {`${seconds}secs`}
          </Text>
          {item.project !== '' && (
            <Text style={styles.project}>{item.project}</Text>
          )}
        </Layout>

        <Layout style={styles.column1}>
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
  );
};

const themedStyles = StyleService.create({
  item: {
    marginVertical: 8,
    padding: 0,
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
    flexGrow: 1,
    paddingVertical: 2,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  time: {
    color: '$color-basic-700',
    justifyContent: 'center',
  },
  project: {
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
