import React from 'react';

import {Text, Card, Layout, StyleService, Button} from '@ui-kitten/components';

export default ({item, index, onPress}) => {
  return (
    <Card style={styles.item} onPress={onPress}>
      <Layout style={styles.row}>
        <Layout style={styles.column1}>
          <Text category="s1">{item.title}</Text>
          <Text>Project Name</Text>
        </Layout>
        <Layout style={styles.column2}>
          <Text category="h5">4h 30m 52s</Text>
          <Button style={styles.button} status="danger">
            Stop
          </Button>
        </Layout>
      </Layout>
    </Card>
  );
};

const styles = StyleService.create({
  item: {
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
