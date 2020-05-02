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
  CheckBox,
  StyleService,
} from '@ui-kitten/components';

const TaskItem = ({item, index, onPress}) => {
  return (
    <Card style={styles.item} onPress={onPress}>
      <Layout style={styles.row}>
        <Layout style={styles.column1}>
          <CheckBox />
        </Layout>
        <Layout style={styles.column2}>
          <Text category="s1">Project Name</Text>
          <Text>
            <FontAwesomeIcon icon={faClock} /> Time: 8h 10m
          </Text>
        </Layout>
        <Layout style={styles.column1}>
          <Button status="success" />
        </Layout>
      </Layout>
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
    justifyContent: 'center',
  },
  column2: {
    backgroundColor: 'transparent',
    flexGrow: 1,
    paddingVertical: 2,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
});
export default TaskItem;
