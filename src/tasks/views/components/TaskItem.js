import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';

import {
  Button,
  Text,
  Card,
  ListItem,
  View,
  Layout,
  Input,
  StyleService,
} from '@ui-kitten/components';

const TaskItem = ({item, index}) => {
  return (
    <Card style={styles.item}>
      <Layout style={styles.row}>
        <Layout style={styles.column1}>
          <Text>Checkbox</Text>
        </Layout>
        <Layout style={styles.column2}>
          <Text category="s2">Project Name</Text>
          <Text>
            Time: <FontAwesomeIcon icon={faClock} /> 8h 10m
          </Text>
        </Layout>
      </Layout>
      <Layout style={styles.breakRow} />
    </Card>
  );
};

const styles = StyleService.create({
  item: {
    marginVertical: 8,
    padding: 0,
  },

  row: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
  },

  column1: {
    backgroundColor: 'transparent',
    flexBasis: 'auto',
    flexShrink: 0,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  column2: {
    backgroundColor: 'transparent',
    flexGrow: 1,
    paddingVertical: 2,
    paddingHorizontal: 4,
    justifyContent: 'space-between',
  },
});
export default TaskItem;
