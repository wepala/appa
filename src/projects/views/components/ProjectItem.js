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
  StyleService,
} from '@ui-kitten/components';

const ProjectItem = ({item, index}) => {
  return (
    <ListItem style={styles.item}>
      <Layout style={styles.row}>
        <Layout style={styles.column1}>
          <FontAwesomeIcon icon={faGithub} size={50} />
        </Layout>
        <Layout style={styles.column2}>
          <Text category="h4">Project Name</Text>
          <Text>
            <FontAwesomeIcon icon={faClock} /> 8h 10m
          </Text>
        </Layout>
      </Layout>
      <Layout style={styles.breakRow} />
    </ListItem>
  );
};

const styles = StyleService.create({
  item: {
    marginVertical: 8,
    padding: 0,
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
  },

  column1: {
    flexBasis: 'auto',
    flexShrink: 0,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  column2: {
    flexGrow: 1,
    paddingVertical: 2,
    paddingHorizontal: 4,
    justifyContent: 'space-between',
  },
});
export default ProjectItem;
