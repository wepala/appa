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

const TaskItem = ({item, onPress, onComplete, onStart, timeSpentToday}) => {
  const [checked, toggleCheck] = useState(false);
  const styles = useStyleSheet(themedStyles);

  return (
    <Card
      testID={'TaskItem'}
      style={styles.item}
      onPress={onPress}
      status={checked && 'success'}>
      <Layout style={styles.row}>
        <Layout style={styles.column1}>
          <CheckBox
            testID={'TaskCheckBox'}
            status="success"
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
          <Text style={styles.time}>Time: {timeSpentToday} seconds</Text>
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
            onPress={() => onStart(item.id)}
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
