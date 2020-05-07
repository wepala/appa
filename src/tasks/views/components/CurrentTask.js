import React from 'react';

import {
  Text,
  Card,
  Layout,
  StyleService,
  Button,
  useStyleSheet,
} from '@ui-kitten/components';
import {StopOutlineIcon} from '../../../views/components/Icons';

export default ({item, index, onPress}) => {
  const styles = useStyleSheet(themedStyles);
  item = item === undefined ? {title: 'Lorem Ipsum', project: ''} : item;

  return (
    <Card testID="CurrentTask" style={styles.item} onPress={onPress}>
      <Layout style={styles.row}>
        <Layout style={styles.column1}>
          <Text category="s1">{item.title}</Text>
          {item.project !== '' && <Text category="s2">{item.project}</Text>}
        </Layout>
        <Layout style={styles.column2}>
          <Text category="h5">{item.totalTime}</Text>
          <Button
            testID="TaskButton"
            style={styles.button}
            status="danger"
            accessoryRight={StopOutlineIcon}>
            Stop
          </Button>
        </Layout>
      </Layout>
    </Card>
  );
};

const themedStyles = StyleService.create({
  item: {
    backgroundColor: 'background-basic-color-2',
    padding: 0,
    marginBottom: 16,
  },

  row: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
  },

  column1: {
    backgroundColor: 'transparent',
    flexShrink: 0,
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  column2: {
    backgroundColor: 'transparent',
    flexBasis: 'auto',
  },
  button: {},
});
