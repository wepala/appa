import React, {useState} from 'react';
import {AssetCalendarIcon} from '../../../views/components/Icons';

import {
  Text,
  Card,
  Layout,
  Button,
  CheckBox,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';

const BacklogItem = ({item, index, onPress}) => {
  const [checked, toggleCheck] = useState(false);
  const styles = useStyleSheet(themedStyles);
  return (
    <Card style={styles.item} onPress={() => onPress(index)}>
      <Layout style={styles.row}>
        <Layout style={styles.column1}>
          <CheckBox checked={checked} onChange={toggleCheck} />
        </Layout>
        <Layout style={styles.column2}>
          <Text category="s1" style={styles.task}>
            {item.title}
          </Text>
          <Text style={styles.time}>Time: 30m out of 1h</Text>
        </Layout>
        <Layout style={styles.column1}>
          <Button
            size="small"
            appearance="ghost"
            status="basic"
            accessoryLeft={AssetCalendarIcon}
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
  task: {
    marginBottom: 4,
  },
  time: {
    color: '$color-basic-700',
    marginBottom: 4,
  },
  icon: {
    width: 20,
    height: 20,
    margin: 0,
    padding: 0,
  },
});

export default BacklogItem;
